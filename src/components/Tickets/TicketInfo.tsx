import Link from "next/link";
import React from "react";

const TicketInfo: React.FC = () => {
  return (
    <section className="row align-items-center g-3">
      <div className="col-auto border-end text-center pe-3">
        <h5 className="m-0">TUE</h5>
        <p className="small text-muted m-0">AUG 1, 2023</p>
        <p className="small text-muted m-0">[TIME TBA]</p>
      </div>
      <div className="col ps-3">
        <h5 className="m-0">2023 Baltimore Ravens Season Tickets</h5>
        <p className="small text-muted mb-1">M&T Bank Stadium, Baltimore, MD</p>
        <Link href={"/event"} className="btn btn-sm btn-primary text-white">
          Show All Events
        </Link>
      </div>
      <div className="col-12 col-md-5 col-xl-3 d-none d-lg-block">
        <h5 className="m-0">100% Money-Back Guarantee</h5>
        <p className="m-0">
          Ticket Network is a resale marketplace, not a box office or venue.
          Prices may be above or below face value. Your seats are together
          unless otherwise noted. Tickets will be the ones your ordered or
          better. Refunds for canceled events
        </p>
      </div>
    </section>
  );
};

export default TicketInfo;
