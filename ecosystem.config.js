module.exports = {
  apps: [
    {
      name: "portal_sds",
      script: "./index.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
