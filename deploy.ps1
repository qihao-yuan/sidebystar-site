# deploy.ps1
# One-shot deploy / update script for the Windows IIS + pm2 production host.
# Usage (on the cloud server, in an admin PowerShell):
#     cd C:\www\sidebystar-site
#     .\deploy.ps1

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

function Step($msg) {
    Write-Host ""
    Write-Host "==> $msg" -ForegroundColor Cyan
}

Step "git pull"
git pull --ff-only

Step "sync IIS / pm2 config to site root"
# These two files live in the repo under deploy/iis/ so they are versioned,
# but IIS reads web.config and PM2 reads ecosystem.config.cjs from the site
# physical root, so each deploy mirrors them in.
Copy-Item .\deploy\iis\web.config            .\web.config            -Force
Copy-Item .\deploy\iis\ecosystem.config.cjs  .\ecosystem.config.cjs  -Force

Step "npm ci"
npm ci

Step "next build"
npm run build

Step "pm2 (re)load"
# We use ecosystem.config.cjs (not inline pm2 start args) because PowerShell + pm2
# on Windows silently drops args after '--', which would end up running `next dev`
# instead of `next start`.
$exists = (pm2 id sidebystar 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($exists)) {
    pm2 start ecosystem.config.cjs
} else {
    # In cluster mode `pm2 reload` is a zero-downtime rolling restart.
    # If anything goes wrong (e.g. cluster-mode mismatch after a config change),
    # fall back to a hard stop + port-3000 cleanup + fresh start. This is what
    # prevents a repeat of the 119k-restart loop where a zombie Node process
    # held :3000 and PM2 spun forever on EADDRINUSE.
    $reloadOk = $true
    try {
        pm2 reload sidebystar --update-env
        if ($LASTEXITCODE -ne 0) { $reloadOk = $false }
    } catch {
        $reloadOk = $false
    }

    if (-not $reloadOk) {
        Write-Warning "pm2 reload failed, hard restart with port cleanup"
        pm2 stop sidebystar -s
        Start-Sleep -Seconds 3
        Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
            Select-Object -ExpandProperty OwningProcess -Unique |
            ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
        pm2 delete sidebystar -s
        pm2 start ecosystem.config.cjs
    }
}
pm2 save | Out-Null

Step "done"
pm2 status
Write-Host ""
Write-Host "Site is live on http://127.0.0.1:3000 (behind IIS)." -ForegroundColor Green
