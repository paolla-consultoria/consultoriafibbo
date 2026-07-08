$ErrorActionPreference = 'Stop'

$nodeDir = 'C:\Users\BG.BEGROWTH-0523\Desktop\FIBBO\node-v22.23.1-win-x64\node-v22.23.1-win-x64'
$env:Path = "$nodeDir;$env:Path"

if (-not $env:CLICKUP_API_KEY) {
  $env:CLICKUP_API_KEY = 'pk_84110507_RDCJKLNYHRL35JPZOXQEHZAFGK25YW61'
}

if (-not $env:CLICKUP_TEAM_ID) {
  $env:CLICKUP_TEAM_ID = '90152046869'
}

if (-not $env:CLICKUP_MCP_LICENSE_KEY) {
  $env:CLICKUP_MCP_LICENSE_KEY = ''
}

Set-Location 'C:\Users\BG.BEGROWTH-0523\Desktop\FIBBO'
Write-Host "Using Node: $(& "$nodeDir\node.exe" -v)"
Write-Host 'Starting ClickUp MCP via npx...'
& "$nodeDir\npx.cmd" -y @taazkareem/clickup-mcp-server@latest
