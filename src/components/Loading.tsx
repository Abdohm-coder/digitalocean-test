import React from "react";

const Loading = ({ progress }: { progress: number }) => {
  return (
    <div className="loading-wrapper">
      <div className="progress-bar">
        <span
          style={{ width: `${progress}%` }}
          className="progess-bar-fill"></span>
      </div>
      <span className="progress-text">
        {progress === 0 ? "Loading..." : `${progress}%`}
      </span>
    </div>
  );
};

export default Loading;
