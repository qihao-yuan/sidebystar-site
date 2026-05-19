# One-time on the IIS server (admin PowerShell).
# Allows ARR/URL Rewrite to set X-Forwarded-* on outbound proxy requests.
# After this, you may add <serverVariables> back to web.config (see web.config.with-forwarded.xml).

$ErrorActionPreference = 'Stop'
$appcmd = "$env:windir\system32\inetsrv\appcmd.exe"

& $appcmd unlock config /section:system.webServer/rewrite/allowedServerVariables

$vars = @(
    'HTTP_X_FORWARDED_HOST',
    'HTTP_X_FORWARDED_PROTO',
    'HTTP_X_FORWARDED_FOR',
    'HTTP_X_REAL_IP'
)

foreach ($name in $vars) {
    $exists = & $appcmd list config -section:system.webServer/rewrite/allowedServerVariables /"[$name=$name]" 2>$null
    if (-not $exists) {
        & $appcmd set config -section:system.webServer/rewrite/allowedServerVariables /+"[name='$name']" /commit:apphost
        Write-Host "Allowed: $name"
    } else {
        Write-Host "Already allowed: $name"
    }
}

Write-Host "Done. Re-run sync-webconfig.ps1 after adding <serverVariables> to the proxy rule in web.config (see README)."
