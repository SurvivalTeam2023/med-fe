const { config } = require("core/constant");
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${config.SERVER_URL}`,
      changeOrigin: true,
    })
  );
};
