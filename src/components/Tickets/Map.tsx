import { useState } from "react";
import { BsArrowsAngleContract, BsArrowsFullscreen } from "react-icons/bs";

function TicketResults({ widgetHTML, id }: { widgetHTML: string; id: number }) {
  const [show, setShow] = useState(false);
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = `https://mapwidget3.seatics.com/js?eventId=${5312098}&websiteConfigId=690`;
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [id]);

  return (
    <div>
      <div className="d-none d-lg-block">
        <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />
      </div>
      <div className="d-block d-lg-none text-center">
        {show && <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />}
        <button
          className="btn btn-sm btn-light mt-2"
          onClick={() => setShow((s) => !s)}>
          {show ? "Hide Map " : "Show Map "}
          {show ? <BsArrowsAngleContract /> : <BsArrowsFullscreen />}
        </button>
      </div>

      {/* Render the widgetHTML */}

      {/* Rest of your ticket results page content */}
    </div>
  );
}

export default TicketResults;
