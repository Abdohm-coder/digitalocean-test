import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { GetEventsProps } from "../../types/data-types";
import Link from "next/link";

const EventList: React.FC<{ events: GetEventsProps[] }> = () => {
  return (
    <section>
      <div className="list-group">
        {new Array(10).fill(" ").map(({ ID }) => (
          <Link
            key={ID}
            href={`/tickets/${ID}`}
            className="list-group-item list-group-item-action event-item">
            <div className="d-flex gap-3 align-items-center w-100">
              <div className="text-center border-end pe-3">
                <h6 className="mb-1 text-primary">MAR 09</h6>
                <p className="m-0 small text-muted">THU</p>
                <p className="m-0 small text-muted">8:00 PM</p>
                <p className="mb-0 mt-2 small bg-primary rounded-pill px-2 bg-opacity-10 border border-primary text-primary d-none d-md-block">
                  Next week
                </p>
              </div>
              <div className="flex-fill">
                <h5 className="mb-1 text-muted">Sam Morril</h5>
                <p className="m-0 text-muted">College Street Music Hall</p>
                <p className="m-0 text-muted">New Haven, CT, USA</p>
                <p className="m-0 small text-muted">
                  <strong className="text-dark">19 tickets remaining</strong>{" "}
                  fot this event
                </p>
              </div>
              <button className="m-0 ms-auto px-3 py-1 rounded-pill event-button bg-info text-white fw-semibold d-none d-md-block">
                See Tickets
              </button>
              <BsChevronRight className=" d-block d-md-none text-primary" />
            </div>
          </Link>
        ))}
        <Link href="#" className="list-group-item text-center">
          <button className="btn btn-sm btn-outline-dark px-5 rounded-pill my-4">
            See More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EventList;
