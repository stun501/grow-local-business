$ErrorActionPreference = "Stop"
$envMap = @{}
Get-Content (Join-Path $PSScriptRoot "..\.env") | ForEach-Object {
  if ($_ -match "^\s*#" -or $_ -notmatch "=") { return }
  $k, $v = $_.Split("=", 2)
  $envMap[$k.Trim()] = $v.Trim()
}
$loginBody = @{ email = $envMap["BASEROW_EMAIL"]; password = $envMap["BASEROW_PASSWORD"] } | ConvertTo-Json
$login = Invoke-RestMethod -Method Post -Uri "https://api.baserow.io/api/user/token-auth/" -ContentType "application/json" -Body $loginBody
$auth = @{ Authorization = "JWT $($login.token)" }
$fields = Invoke-RestMethod -Method Get -Uri "https://api.baserow.io/api/database/fields/table/1092861/" -Headers $auth
$tool = $fields | Where-Object { $_.name -eq "Tool" }
if (-not $tool) {
  Write-Host "No Tool field. Fields:"
  $fields | ForEach-Object { Write-Host (" - " + $_.name) }
  exit 1
}
Write-Host ("Tool field id=" + $tool.id)
$wanted = @(
  "Instant Quote Form",
  "Google Review QR",
  "Foundation Scorecard",
  "Review Reply Writer",
  "Booking Link",
  "Instant Valuation"
)
$existing = @($tool.select_options | ForEach-Object { $_.value })
Write-Host ("Existing: " + ($existing -join " | "))
$options = [System.Collections.Generic.List[object]]::new()
foreach ($o in $tool.select_options) { $options.Add($o) }
foreach ($w in $wanted) {
  if ($existing -notcontains $w) {
    $options.Add(@{ value = $w; color = "blue" })
    Write-Host ("Will add: " + $w)
  }
}
if ($options.Count -gt $tool.select_options.Count) {
  $body = @{ select_options = $options } | ConvertTo-Json -Depth 8
  Invoke-RestMethod -Method Patch -Uri ("https://api.baserow.io/api/database/fields/" + $tool.id + "/") -Headers $auth -ContentType "application/json" -Body $body | Out-Null
  Write-Host "Tool options updated"
} else {
  Write-Host "Tool options already complete"
}
$sf = Invoke-RestMethod -Method Get -Uri "https://api.baserow.io/api/database/fields/table/1098284/" -Headers $auth
Write-Host "Scorecard Runs fields:"
$sf | ForEach-Object { Write-Host (" - " + $_.name + " (" + $_.type + ")") }
