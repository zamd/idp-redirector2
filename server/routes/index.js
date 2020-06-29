const { Router } = require("express");

const logger = require("../lib/logger");

module.exports = storage => {
  const index = new Router();

  index.use(async (req, res, next) => {
    let storageData = global.storageData;
    if (!storageData || !storageData.hostToPattern || !storageData.errorPage) {
      logger.verbose("Fetching storage data from webtask storage");
      storageData = await storage.read();
      global.storageData = storageData;
    }

    req.hostToPattern = storageData.hostToPattern || {}; // don't need to fail if not initialized, everything will just fail
    req.errorPage = storageData.errorPage; // don't need to fail if not initialized, everything will just fail
    next();
  });

  index.post("/", (req, res) => {
    return res.redirect(
      "https://tailbin.herokuapp.com/14jnw4w1?iss=secure-issuer&target_lin_uri=http://go.com"
    );
  });

  return index;
};
