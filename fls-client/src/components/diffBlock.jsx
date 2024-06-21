import chevron from "../assets/Vector.png";
import { useEffect, useState } from "react";
const DiffBlock = (props) => {
  console.log("data=", props?.data);
  const [showFlag, setShowFlag] = useState(true);

  const retCss = (str) => {
    let cssStr = " flex-grow-1 ";

    if (str[0] === "-") {
      cssStr = cssStr+" bg-pr-red ";
    } else if (str[0] === "+") {
      cssStr = cssStr+" bg-pr-green ";
    }

    return cssStr;
  };

  return (
    <div
      className="d-flex d-flex-dir-column w-80 gap-0-2-5rem"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="d-flex t-left col-link weight-400 font-size-14px lh-20px gap-0-5rem align-items-center">
        <img
          src={chevron}
          alt="description"
          className={showFlag ? "rotate-0deg" : "rotate-270deg"}
          style={{ height: "10px" }}
          onClick={(e) => {
            setShowFlag((prevValue) => !prevValue);
          }}
        />
        {props?.data?.headFile?.path}
      </div>

      {showFlag && (
        <div className="font-monospace font-size-12px border-col-v1 border-solid-1px col-primary">
          {props?.data?.hunks?.map((l_item, l_index) => {
            return (
              <div className="d-flex d-flex-dir-column t-left  weight-600" key={l_index}>
                <div className="">{l_item.header}</div>

                <div className="">
                  {l_item?.lines?.map((innerLine, innerIndex) => {
                    return (
                      <div key={innerIndex * 1000} className="d-flex">
                        <div className="d-flex col-secondary flex-basis-40px justify-content-center">
                          {innerLine?.baseLineNumber}
                        </div>

                        <div className="d-flex col-secondary flex-basis-40px bg-pr-blue justify-content-center">
                          {innerLine?.headLineNumber}
                        </div>

                        <div className={retCss(innerLine?.content)}> {innerLine?.content}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DiffBlock;
