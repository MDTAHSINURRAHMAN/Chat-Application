// External Imports
const express = require("express");
const router = express.Router();

// Internal Imports
const {getInbox} = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// Login Page
router.get('/', decorateHtmlResponse("Inbox"), getInbox)

module.exports = router;