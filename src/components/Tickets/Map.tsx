import React, { useState } from "react";
import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";
import MapImage from "@/assets/images/map.jpg";
import { WBCID } from "@/settings/site.settings";
import Script from "next/script";

const Map: React.FC<{ id: number }> = ({ id }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Script
        src={`https://mapwidget3.seatics.com/js?eventId=${id}&websiteConfigId=${WBCID}`}
      />
      <div className="d-none d-lg-block">
        {/* <img src={MapImage} alt="Map" className="w-100" /> */}
      </div>
      <div className="d-block d-lg-none text-center">
        {show && <img src={MapImage} alt="Map" className="w-100" />}
        <button
          className="btn btn-sm btn-light mt-2"
          onClick={() => setShow((s) => !s)}>
          {show ? "Hide Map " : "Show Map "}
          {show ? <BsArrowsAngleContract /> : <BsArrowsFullscreen />}
        </button>
      </div>
    </>
  );
};

export default Map;
