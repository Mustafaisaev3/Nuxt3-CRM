module.exports = {
  apps: [
    {
      name: 'we.pro-app',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}