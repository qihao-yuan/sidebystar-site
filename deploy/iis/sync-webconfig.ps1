# Copy deploy/iis/web.config to the IIS site physical path.
# Run on the Windows server (admin PowerShell):
#   cd C:\www\sidebystar-site
#   .\deploy\iis\sync-webconfig.ps1
# Optional: -SiteName sidebystar

param(
    [string]$SiteName = 'sidebystar'
)

$ErrorActionPreference = 'Stop'
$src = Join-Path $PSScriptRoot 'web.config'
if (-not (Test-Path -LiteralPath $src)) {
    throw "Missing $src"
}

Import-Module WebAdministration -ErrorAction Stop
$site = Get-Website -Name $SiteName -ErrorAction Stop
$destRoot = $site.physicalPath
if (-not $destRoot) { throw "Site '$SiteName' has no physicalPath" }

$dest = Join-Path $destRoot 'web.config'
Copy-Item -LiteralPath $src -Destination $dest -Force
Write-Host "OK: $src -> $dest" -ForegroundColor Green
Write-Host "Test: curl.exe -sI http://www.sidebystar.com/  (expect 301 Location: https://...)"
