const retHunksArr = (data) => {
  console.log("======");

  let hunkArr = data?.split("\n") || [];

  let HUNKS_OBJ = {};

  let currenthead = "";
  hunkArr?.forEach((str) => {
    console.log("STR = ", str);

    if (str.includes("@@")) {
      HUNKS_OBJ[str] = [];
      currenthead = str;
    } else {
      HUNKS_OBJ[currenthead].push(str);
    }
  });

  currenthead = "";

  console.log(" HUNKS_OBJ", HUNKS_OBJ);

  let HUNKS_ARR = [];

  const atRegex = /@@(.*?)@@/;
  const dregex = /-?\d+/g;

  Object.entries(HUNKS_OBJ).map((item, index) => {
    console.log("iitem ", item);

    let header = item[0].match(atRegex);

    let digits = header[1].match(dregex);
    console.log("digits", digits);

    let baseDigit = Math.abs(Number(digits[0]));

    let headDigit = Math.abs(Number(digits[2]));

    // let lines = item[1].map((localLine, index) => {
    //   return {
    //     baseLineNumber: digits[0],
    //     headLineNumber: digits[2],
    //     content: localLine,
    //   };
    // });

    let lines = [];

    item[1].forEach((localLine, index) => {
      let curbase = null,
        curHead = null;

      if (localLine[0] === " ") {
        curbase = baseDigit++;
        curHead = headDigit++;

        // curbase = baseDigit;

        // curHead = headDigit;
      } else if (localLine[0] === "+") {
        curHead = headDigit++;

        // curHead = headDigit;
      } else {
        curbase = baseDigit++;
        // curbase = baseDigit;
      }

      lines.push({
        // baseLineNumber: baseDigit,
        // headLineNumber: headDigit,
        // content: localLine,

        baseLineNumber: curbase,
        headLineNumber: curHead,
        content: localLine,
      });
    });

    HUNKS_ARR.push({
      header: item[0],
      lines: lines,
    });
  });

  console.log("======");

  return HUNKS_ARR;
};

module.exports = {
  retHunksArr,
};
