const express = require("express");

const router = express.Router();

const {
  testControl,
  getCommit,
  getCommitByID,
  getCommitDiffByID,
} = require("../controllers/repoController");

router.get("/", testControl);

router.get("/:owner/:repository/commits", getCommit);

router.get("/:owner/:repository/commits/:oid", getCommitByID);

router.get("/:owner/:repository/commits/:oid/diff", getCommitDiffByID);

module.exports = router;
