import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { GetEventsProps } from "../../types/data-types";
import Link from "next/link";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";
dayjs.extend(LocalizedFormat);

const EventList: React.FC<{
  eventNumber: number;
  events: GetEventsProps[];
  setEventNumber: React.Dispatch<React.SetStateAction<number>>;
}> = ({ events, setEventNumber, eventNumber }) => {
  return (
    <section>
      <div className="list-group">
        {removeDuplicatedElements(events, "VenueID").map(
          ({
            ID,
            Name,
            Venue,
            City,
            StateProvince,
            DisplayDate,
            Date: DateTime,
          }: GetEventsProps) => (
            <Link
              key={ID}
              href={`/tickets/${ID}`}
              className="list-group-item list-group-item-action event-item">
              <div className="d-flex gap-3 align-items-center w-100">
                <div className="text-center border-end pe-3">
                  {DisplayDate.includes("TBA") ? (
                    <h6 className="mb-1 text-primary text-uppercase">TBA</h6>
                  ) : (
                    <>
                      <h6 className="mb-1 text-primary text-uppercase">
                        {new Date(DateTime).toLocaleString("en-US", {
                          weekday: "short",
                        })}
                      </h6>
                      <p className="m-0 small text-muted text-uppercase">
                        {`${new Date(DateTime).toLocaleString("en-US", {
                          day: "2-digit",
                        })}
                      ${new Date(DateTime).toLocaleString("en-US", {
                        month: "short",
                      })}`}
                      </p>
                      <p className="m-0 small text-muted text-uppercase">
                        {dayjs(DateTime).format("LT")}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex-fill">
                  <h5 className="mb-1 text-muted">
                    {Venue} - {City}, {StateProvince}
                  </h5>
                  <p className="m-0 text-muted">{Name}</p>
                </div>
                <button className="m-0 ms-auto px-3 py-1 rounded-pill event-button bg-info text-white fw-semibold d-none d-md-block">
                  See Tickets
                </button>
                <BsChevronRight className=" d-block d-md-none text-primary" />
              </div>
            </Link>
          )
        )}
        {events.length === 0 && (
          <div className="list-group-item list-group-item-action event-item">
            No events available.
          </div>
        )}
        {eventNumber <= 500 && (
          <div className="list-group-item text-center">
            <button
              onClick={() => setEventNumber((state) => state * 2)}
              className="btn btn-sm btn-outline-dark px-5 rounded-pill my-4">
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;
