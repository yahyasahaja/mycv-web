module.exports = {
  apps: [
    {
      name: 'yahya-cv-web',
      script: 'build/server/index.js',
      instances: 1,
      autorestart: true,
      watch: ['build'],
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
    },
  ],
};
