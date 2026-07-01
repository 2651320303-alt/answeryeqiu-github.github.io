param(
  [switch]$NoBrowser
)

$ErrorActionPreference = "SilentlyContinue"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$Url = "http://127.0.0.1:5173/"
$LogPath = Join-Path $ProjectRoot "vite-dev.log"
$ErrPath = Join-Path $ProjectRoot "vite-dev.err.log"

function Test-SiteReady {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 2
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (-not (Test-SiteReady)) {
  Start-Process `
    -FilePath "npm.cmd" `
    -ArgumentList @("run", "dev") `
    -WorkingDirectory $ProjectRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput $LogPath `
    -RedirectStandardError $ErrPath

  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    if (Test-SiteReady) {
      break
    }
  }
}

if (-not $NoBrowser) {
  Start-Process $Url
}
