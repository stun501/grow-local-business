# Grow Local - create Baserow table fields (one-time setup)
# Run in Cursor terminal or Windows PowerShell
#
# Database tokens can only create ROWS. Creating COLUMNS needs
# a short-lived login JWT (email + password).
#
# Option A: temporarily add to .env then run this script:
#   BASEROW_EMAIL=you@example.com
#   BASEROW_PASSWORD=your-password
# Then remove those two lines from .env after success.
#
# Option B: run without those vars - script will prompt you.

$ErrorActionPreference = "Stop"
$Api = "https://api.baserow.io"
$ProjectRoot = Split-Path $PSScriptRoot -Parent
$EnvFile = Join-Path $ProjectRoot ".env"

function Get-DotEnvValue([string]$Key) {
  if (-not (Test-Path $EnvFile)) { return $null }
  $line = Get-Content $EnvFile | Where-Object { $_ -match ("^\s*" + [regex]::Escape($Key) + "\s*=") } | Select-Object -First 1
  if (-not $line) { return $null }
  return ($line -replace ("^\s*" + [regex]::Escape($Key) + "\s*="), "").Trim().Trim('"').Trim("'")
}

Write-Host ""
Write-Host "Grow Local - Baserow field setup" -ForegroundColor Cyan
Write-Host ""

$email = Get-DotEnvValue "BASEROW_EMAIL"
$password = Get-DotEnvValue "BASEROW_PASSWORD"

if (-not $email -or -not $password) {
  Write-Host "No BASEROW_EMAIL / BASEROW_PASSWORD in .env - prompting."
  Write-Host "Password is NOT saved to disk by this prompt."
  Write-Host ""
  $email = Read-Host "Baserow email"
  $secure = Read-Host "Baserow password" -AsSecureString
  $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  $password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
  [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)
} else {
  Write-Host "Using BASEROW_EMAIL / BASEROW_PASSWORD from .env (remove password after this run)." -ForegroundColor Yellow
}

try {
  $authBody = @{ email = $email; password = $password } | ConvertTo-Json
  $auth = Invoke-RestMethod -Uri "$Api/api/user/token-auth/" -Method Post -ContentType "application/json" -Body $authBody
  $jwt = $auth.token
  if (-not $jwt) { throw "No JWT returned - check email/password." }
  Write-Host "Logged in OK." -ForegroundColor Green
} catch {
  Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
  if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
  exit 1
} finally {
  $password = $null
}

$headers = @{
  Authorization = "JWT $jwt"
  "Content-Type" = "application/json"
}

function Get-Fields([int]$TableId) {
  return Invoke-RestMethod -Uri "$Api/api/database/fields/table/$TableId/" -Headers $headers -Method Get
}

function Ensure-TextField([int]$TableId, [string]$Name, [string]$Type = "text") {
  $fields = Get-Fields $TableId
  $existing = $fields | Where-Object { $_.name -eq $Name } | Select-Object -First 1
  if ($existing) {
    if ($existing.type -ne $Type -and -not $existing.primary) {
      try {
        $body = @{ name = $Name; type = $Type } | ConvertTo-Json
        Invoke-RestMethod -Uri "$Api/api/database/fields/$($existing.id)/" -Headers $headers -Method Patch -Body $body | Out-Null
        Write-Host "  Updated '$Name' -> $Type"
        return
      } catch {
        Write-Host "  Kept existing '$Name' ($($existing.type)) - update skipped"
        return
      }
    }
    Write-Host "  OK already: '$Name' ($($existing.type))"
    return
  }
  $body = @{ name = $Name; type = $Type } | ConvertTo-Json
  Invoke-RestMethod -Uri "$Api/api/database/fields/table/$TableId/" -Headers $headers -Method Post -Body $body | Out-Null
  Write-Host "  Created '$Name' ($Type)" -ForegroundColor Green
}

function Rename-PrimaryIfNeeded([int]$TableId, [string]$DesiredName) {
  $fields = Get-Fields $TableId
  $primary = $fields | Where-Object { $_.primary -eq $true } | Select-Object -First 1
  if (-not $primary) { return }
  if ($primary.name -eq $DesiredName) {
    Write-Host "  Primary OK: '$DesiredName'"
    return
  }
  $body = @{ name = $DesiredName } | ConvertTo-Json
  Invoke-RestMethod -Uri "$Api/api/database/fields/$($primary.id)/" -Headers $headers -Method Patch -Body $body | Out-Null
  Write-Host "  Renamed primary '$($primary.name)' -> '$DesiredName'" -ForegroundColor Green
}

function Remove-DefaultJunk([int]$TableId) {
  $fields = Get-Fields $TableId
  foreach ($junk in @("Notes", "Active")) {
    $f = $fields | Where-Object { $_.name -eq $junk -and -not $_.primary } | Select-Object -First 1
    if ($f) {
      try {
        Invoke-RestMethod -Uri "$Api/api/database/fields/$($f.id)/" -Headers $headers -Method Delete | Out-Null
        Write-Host "  Removed default '$junk'" -ForegroundColor Yellow
      } catch {
        Write-Host "  Could not remove '$junk' (safe to delete manually in Baserow UI)"
      }
    }
  }
}

$tables = @(
  @{
    Id = 1092861
    Label = "Owner Leads"
    Primary = "Name"
    Fields = @(
      @{ Name = "Email"; Type = "email" },
      @{ Name = "Business"; Type = "text" },
      @{ Name = "Phone"; Type = "text" },
      @{ Name = "Tool"; Type = "text" },
      @{ Name = "Consent"; Type = "text" },
      @{ Name = "Date"; Type = "text" }
    )
  },
  @{
    Id = 1092866
    Label = "Customer Quote Requests"
    Primary = "Customer name"
    Fields = @(
      @{ Name = "Phone"; Type = "text" },
      @{ Name = "Vehicle"; Type = "text" },
      @{ Name = "Job"; Type = "text" },
      @{ Name = "Price range"; Type = "text" },
      @{ Name = "Business"; Type = "text" },
      @{ Name = "Date"; Type = "text" }
    )
  },
  @{
    Id = 1092867
    Label = "Valuation Leads"
    Primary = "Customer name"
    Fields = @(
      @{ Name = "Phone"; Type = "text" },
      @{ Name = "Email"; Type = "email" },
      @{ Name = "Postcode"; Type = "text" },
      @{ Name = "Property type"; Type = "text" },
      @{ Name = "Bedrooms"; Type = "text" },
      @{ Name = "Condition"; Type = "text" },
      @{ Name = "Ballpark"; Type = "text" },
      @{ Name = "Business"; Type = "text" },
      @{ Name = "Date"; Type = "text" }
    )
  },
  @{
    Id = 1092868
    Label = "Tool Ideas"
    Primary = "Name"
    Fields = @(
      @{ Name = "Business type"; Type = "text" },
      @{ Name = "Challenge"; Type = "text" },
      @{ Name = "Email"; Type = "email" },
      @{ Name = "Phone"; Type = "text" },
      @{ Name = "Notify"; Type = "text" },
      @{ Name = "Date"; Type = "text" }
    )
  }
)

foreach ($t in $tables) {
  Write-Host ""
  Write-Host "=== $($t.Label) (table $($t.Id)) ===" -ForegroundColor Cyan
  Rename-PrimaryIfNeeded -TableId $t.Id -DesiredName $t.Primary
  Remove-DefaultJunk -TableId $t.Id
  foreach ($f in $t.Fields) {
    Ensure-TextField -TableId $t.Id -Name $f.Name -Type $f.Type
  }
}

Write-Host ""
Write-Host "Done. Refresh Baserow in your browser - all columns should be there." -ForegroundColor Green
Write-Host "If you put BASEROW_PASSWORD in .env, delete that line now." -ForegroundColor Yellow
Write-Host ""
