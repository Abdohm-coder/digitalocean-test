import React, { useState, useEffect } from "react";
import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";
import MapImage from "@/assets/images/map.jpg";
import { WBCID } from "@/settings/site.settings";

const Map: React.FC<{ id: number }> = ({ id }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://mapwidget3.seatics.com/js?eventId=${id}&websiteConfigId=${WBCID}`;
    script.async = true;
    document.body.appendChild(script);
    // @ts-ignore
    window.Seatics = window.Seatics || {};
    // @ts-ignore
    window.Seatics.Text = window.Seatics.Text || {};

    // Adjust individual pieces of text
    // @ts-ignore
    window.Seatics.Text.DeepLink_CloseModalButton = "Select new tickets";
    // @ts-ignore
    window.Seatics.Text["Desktop_DisclosuresTextCurrency"] = function (text) {
      return text.replace("USD", "Points");
    };

    // Clean up function when the component unmounts (optional)
    // return () => {
    //   document.body.removeChild(script);
    //   delete window.Seatics.Text.DeepLink_CloseModalButton;
    //   delete window.Seatics.Text["Desktop_DisclosuresTextCurrency"];
    // };
  }, [id]);
  const [show, setShow] = useState(false);
  return (
    <>
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
