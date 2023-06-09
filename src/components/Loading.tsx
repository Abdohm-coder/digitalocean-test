import React from "react";

const Loading: React.FC<{ type?: "dots" | "ripple" }> = ({ type }) => {
  return type === "dots" ? (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
