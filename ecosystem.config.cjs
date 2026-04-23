// pm2 ecosystem config for production.
// Used by `deploy.ps1` and manual `pm2 start ecosystem.config.cjs` on the Windows host.
//
// Why this file exists:
//   On Windows, `pm2 start npm -- run start -- -p 3000` silently drops the inner args
//   (pm2 treats the first token after `--` as a script file path). Same problem with
//   `pm2 start next -- start -p 3000` inside PowerShell. Using an explicit JS config
//   with an args[] array bypasses all shell quoting and works everywhere.

module.exports = {
  apps: [
    {
      name: "sidebystar",
      script: "node_modules/next/dist/bin/next",
      args: ["start", "-p", "3000"],
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
