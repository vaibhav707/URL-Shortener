const express = require("express");
const {handleGenNewURL, handleAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/", handleGenNewURL);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;