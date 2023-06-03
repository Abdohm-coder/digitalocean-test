import { useEffect } from "react";

function TicketResults({ widgetHTML, id }: { widgetHTML: string; id: number }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://mapwidget3.seatics.com/js?eventId=${5312098}&websiteConfigId=690`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  return (
    <div>
      <h1>Ticket Results</h1>

      {/* Render the widgetHTML */}
      <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />

      {/* Rest of your ticket results page content */}
    </div>
  );
}

export default TicketResults;
