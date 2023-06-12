import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { GetEventsProps } from "../../types/data-types";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const EventList: React.FC<{
  eventNumber?: number;
  events: GetEventsProps[] | undefined;
  setEventNumber?: React.Dispatch<React.SetStateAction<number>>;
  error?: boolean;
}> = ({ events, setEventNumber, error }) => {
  return (
    <section>
      <div className="list-group">
        {Array.isArray(events) &&
          events.map(
            ({
              ID,
              Name,
              Venue,
              City,
              StateProvince,
              Date: DateTime,
            }: GetEventsProps) => (
              <a
                key={ID}
                href={`/tickets/${ID}`}
                className="list-group-item list-group-item-action event-item">
                <div className="d-flex gap-3 align-items-center w-100">
                  <div className="text-center border-end pe-3">
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
                  </div>
                  <div className="flex-fill">
                    <h5 className="mb-1 text-muted">{Name}</h5>
                    <p className="m-0 text-muted">
                      {Venue} - {City}, {StateProvince}
                    </p>
                  </div>
                  <button
                    style={{ whiteSpace: "nowrap" }}
                    className="m-0 ms-auto px-3 py-1 rounded-pill event-button bg-info text-white fw-semibold d-none d-md-block">
                    See Tickets
                  </button>
                  <BsChevronRight className=" d-block d-md-none text-primary" />
                </div>
              </a>
            )
          )}
        {((Array.isArray(events) && events.length === 0) ||
          !events ||
          error) && (
          <div className="list-group-item list-group-item-action event-item">
            No events available.
          </div>
        )}
        {Array.isArray(events) &&
          setEventNumber &&
          events.length % 50 === 0 &&
          events.length > 0 && (
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
