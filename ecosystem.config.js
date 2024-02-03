module.exports = {
  apps: [
    {
      name: "a2z",
      port: "3003",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
