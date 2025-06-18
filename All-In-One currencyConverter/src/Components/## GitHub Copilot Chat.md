## GitHub Copilot Chat

- Extension Version: 0.28.0 (prod)
- VS Code: vscode/1.101.0
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.121.5 (107 ms)
- DNS ipv6 Lookup: Error (79 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (110 ms)
- Electron fetch (configured): HTTP 200 (691 ms)
- Node.js https: HTTP 200 (578 ms)
- Node.js fetch: HTTP 200 (658 ms)
- Helix fetch: HTTP 200 (791 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.113.22 (50 ms)
- DNS ipv6 Lookup: Error (90 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (40 ms)
- Electron fetch (configured): HTTP 200 (268 ms)
- Node.js https: HTTP 200 (915 ms)
- Node.js fetch: HTTP 200 (886 ms)
- Helix fetch: HTTP 200 (763 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).