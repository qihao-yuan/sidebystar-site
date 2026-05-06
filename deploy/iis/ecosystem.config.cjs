// PM2 ecosystem for the Next.js production server.
// Copy to the server site root (e.g. C:\www\sidebystar-site) and:
//   pm2 stop sidebystar -s ; pm2 delete sidebystar -s
//   pm2 start ecosystem.config.cjs
//   pm2 save
//
// Notes:
//   - exec_mode 'cluster' uses all CPU cores and round-robins requests, which
//     removes the head-of-line blocking that causes "every page jump feels stuck"
//     on a single-fork PM2 setup. Next.js's `next start` is fully cluster-safe.
//   - windowsHide stops PM2 from spawning a visible cmd window on Windows.
//   - min_uptime + max_restarts prevents the 119k-restart loop scenario where
//     a port-bound zombie keeps eating each new instance immediately.
//   - kill_timeout gives Next 8 seconds for graceful shutdown so port 3000 is
//     actually freed before the next instance tries to listen.
module.exports = {
  apps: [{
    name: 'sidebystar',
    cwd: 'C:\\www\\sidebystar-site',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    interpreter: 'C:\\Program Files\\nodejs\\node.exe',
    exec_mode: 'cluster',
    instances: 'max',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '15s',
    restart_delay: 3000,
    kill_timeout: 8000,
    windowsHide: true,
    env: {
      NODE_ENV: 'production',
      PORT: '3000',
    },
  }],
};
