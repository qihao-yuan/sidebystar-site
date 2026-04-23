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

Step "npm ci"
npm ci

Step "next build"
npm run build

Step "pm2 restart"
# First-run creates the process, later runs just restart it.
# NOTE: on Windows we point pm2 straight at next's JS entry (node_modules\next\dist\bin\next)
# instead of "pm2 start npm -- run start", because the latter silently drops CLI args on Windows
# (bug: pm2 treats 'run' as a script path and fails with "Script not found: ...\run").
$exists = (pm2 id sidebystar 2>$null)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($exists)) {
    pm2 start "node_modules\next\dist\bin\next" --name sidebystar -- start -p 3000
} else {
    pm2 restart sidebystar --update-env
}
pm2 save | Out-Null

Step "done"
pm2 status
Write-Host ""
Write-Host "Site is live on http://127.0.0.1:3000 (behind IIS)." -ForegroundColor Green
