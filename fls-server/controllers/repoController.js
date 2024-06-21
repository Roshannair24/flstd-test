const { Octokit } = require("@octokit/rest");
const { retHunksArr } = require("../utils/utils");

const octokit = new Octokit({
  auth: process.env.PAT,
});

const testControl = (req, res) => {
  res.json({ msg: "cont-get-testv2", data: process.env.PAT });
};

const getCommit = async (req, res) => {
  console.log("getCommit req.params", req.params);

  const resp = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    // owner: "octocat",
    // repo: "Spoon-Knife",

    owner: req.params.owner,
    repo: req.params.repository,

    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  console.log("resp");

  console.log(resp);

  console.log("files");

  console.log(resp?.data?.files);

  res.json({ msg: "getCommit", data: resp?.data });
};

const getCommitByID = async (req, res) => {
  console.log("getCommitByID req.params", req.params);

  let payload = {};

  try {
    const resp = await octokit.request(
      "GET /repos/{owner}/{repo}/commits/{ref}",
      {
        // owner: "octocat",
        // repo: "Spoon-Knife",

        owner: req.params.owner,
        repo: req.params.repository,
        ref: req.params.oid,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    let parentsArr = resp?.data?.parents?.map((item) => {
      return { oid: item?.sha };
    });

    payload = {
      oid: resp?.data?.sha,
      message: resp?.data?.commit?.message,
      author: {
        name: resp?.data?.commit?.author?.name,
        date: resp?.data?.commit?.author?.date,
        email: resp?.data?.commit?.author?.email,
        avatarUrl: resp?.data?.author?.avatar_url,
      },
      committer: {
        name: resp?.data?.commit?.committer?.name,
        date: resp?.data?.commit?.committer?.date,
        email: resp?.data?.commit?.committer?.email,
        avatarUrl: resp?.data?.committer?.avatar_url,
      },
      parents: parentsArr,
    };
  } catch (error) {
    console.log("caught error: ", error);
  }

  // res.json({ msg: "cont-get-test", data: resp?.data });
  res.json([payload]);
};

const getCommitDiffByID = async (req, res) => {
  console.log("getCommitDiffByID req.params", req.params);
  let filesArr = [];

  try {
    const respV1 = await octokit.request(
      "GET /repos/{owner}/{repo}/commits/{ref}",
      {
        // owner: "octocat",
        // repo: "Spoon-Knife",

        owner: req.params.owner,
        repo: req.params.repository,
        ref: req.params.oid,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    let HEAD = respV1?.data?.sha;

    let BASE = respV1?.data?.parents[0]?.sha;

    console.log("BASE= ", BASE, " HEAD= ", HEAD);

    const resp = await octokit.request(
      "GET /repos/{owner}/{repo}/compare/{basehead}",
      {
        owner: req.params.owner,
        repo: req.params.repository,

        basehead: `${BASE}...${HEAD}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    filesArr = resp?.data?.files?.map((item, index) => {
      return {
        changeKind: item?.status,
        headFile: {
          path: item.filename || null,
        },
        baseFile: {
          path: item?.status === "added" ? null : item.filename,
        },
        hunks: retHunksArr(item?.patch),
      };
    });
  } catch (error) {
    console.log("caught error: ", error);
  }

  res.json(filesArr);

  // res.json(resp?.data);
};

module.exports = {
  testControl,
  getCommit,
  getCommitByID,
  getCommitDiffByID,
};
