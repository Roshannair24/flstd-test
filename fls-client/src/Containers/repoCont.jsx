import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommitByID, getCommitDiffByID } from "../reducers/repoReducer";
import moment from "moment";
import DiffBlock from "../components/diffBlock";

const RepoCont = () => {
  let params = useParams();
  const dispatch = useDispatch();

  console.log("parmas", params);
  const reposReduxState = useSelector((state) => {
    // console.log("state", state);

    return state.repository;
  });

  console.log("reposReduxState=", reposReduxState);

  useEffect(() => {
    dispatch(
      getCommitByID({
        owner: params.owner,
        repo: params.repository,
        ref: params.commitSHA,
      })
    );

    dispatch(
      getCommitDiffByID({
        owner: params.owner,
        repo: params.repository,
        ref: params.commitSHA,
      })
    );
  }, []);

  const daysPassed = (localts) => {
    const givenDate = moment(localts);

    const currentDate = moment();

    const daysDifference = currentDate.diff(givenDate, "days");

    return daysDifference;
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex d-flex-dir-column p-2rem bg-col-body bg-col-body"
    >
      <div
        className="d-flex d-flex-dir-column gap-2rem align-items-center"
        // style={{ backgroundColor: "orange" }}
      >
        {reposReduxState?.repoArr?.map((item, index) => {
          return (
            <div
              key={index}
              className="d-flex w-80"
              // style={{ backgroundColor: "red" }}
            >
              <div
                // style={{ backgroundColor: "yellow" }}
                className="d-flex gap-0-5rem flex-basis-50perc"
              >
                <img
                  src={item?.author?.avatarUrl}
                  alt="avatar"
                  className="r-50-perc"
                  style={{ height: "49px" }}
                />

                <div className="d-flex d-flex-dir-column t-left font-arial">
                  <p className="ts-header">{item?.message}</p>
                  <p className="col-muted weight-400 font-size-14px lh-20px">
                    Authored by {' '}
                    <span className="col-body"> {item?.author?.name}</span>
                    {' '}
                    {daysPassed(item?.author?.date)}
                    {' '} days ago
                  </p>
                  <p className="weight-400 font-size-14px lh-20px col-body-v2 ">
                    This is body text. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Eget ipsum massa egestas id pellentesque
                    volutpat maecenas amet.
                  </p>
                </div>
              </div>

              <div className="flex-grow-1"></div>

              {(item?.author?.name !== item?.committer?.name ||
                item?.author?.date !== item?.committer?.date) && (
                <div className="d-flex">
                  <div className="d-flex d-flex-dir-column flex-end t-right font-arial">
                    <p className="col-muted weight-400 font-size-14px lh-20px">
                      Commited by {' '}
                      <span className="col-body">{item?.committer?.name}</span>
                      {' '}
                      {daysPassed(item?.committer?.date)}
                      {' '} days ago
                    </p>
                    <p className="col-muted weight-400 font-size-14px lh-20px">
                      Commit{" "}
                      <span className="col-body font-monospace font-size-12px weight-600">
                        {item?.oid}
                      </span>
                    </p>
                    <p className="col-muted weight-400 font-size-14px lh-20px">
                      Parent{" "}
                      <span className="col-link font-monospace font-size-13px weight-600">
                        {item?.parents[0]?.oid}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {reposReduxState?.repoDiffArr?.map((item, index) => {
          return <DiffBlock key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default RepoCont;
