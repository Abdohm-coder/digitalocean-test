import { useState, useEffect } from "react";
import Map from "@/components/Tickets/Map";
import TicketCard from "@/components/Tickets/TicketCard";
import TicketInfo from "@/components/Tickets/TicketInfo";
import { fetchGetEventTickets3 } from "@/settings/site.settings";
import { GetEventTickets3Props } from "@/types/data-types";
import { useRouter } from "next/router";

const TicketPage = () => {
  const { query } = useRouter();
  const eventID = query.eventID as string;
  const [tickets, setTickets] = useState<GetEventTickets3Props[]>([]);

  useEffect(() => {
    if (+eventID) {
      const fetchData = async () => {
        try {
          const response = await fetchGetEventTickets3({
            eventID: +eventID,
          });
          setTickets(response);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [eventID]);
  return (
    <main className="p-4">
      <TicketInfo />
      <section
        className="row g-3 mt-4 align-items-center border-top"
        style={{ height: "65vh" }}>
        <div className="col-12 col-lg-8 col-xl-9">
          <Map id={+eventID} />
        </div>
        <div
          className="col-12 col-lg-4 col-xl-3 position-relative"
          style={{ maxHeight: "100%", overflow: "auto" }}>
          <div className="position-sticky top-0 text-end" style={{ zIndex: 9 }}>
            <div className="dropdown">
              <button
                className="btn btn-sm btn-primary text-white dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false">
                Filters
              </button>
              <div className="dropdown-menu p-3 shadow">
                <form>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Filter & Sort</h6>
                    <button className="btn btn-link text-decoration-none">
                      Clear Filters
                    </button>
                  </div>
                  <hr className="dropdown-divider" />
                  <div className="d-flex gap-1 mt-3">
                    <input
                      type="radio"
                      className="btn-check"
                      name="quantity"
                      id="quantity-any"
                    />
                    <label
                      className="btn btn-outline-primary rounded-circle p-1"
                      htmlFor="quantity-any"
                      style={{ width: "40px", height: "40px" }}>
                      Any
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="quantity"
                      id="quantity-0"
                    />
                    <label
                      className="btn btn-outline-primary rounded-circle p-1"
                      htmlFor="quantity-0"
                      style={{ width: "40px", height: "40px" }}>
                      0
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="quantity"
                      id="quantity-1"
                    />
                    <label
                      className="btn btn-outline-primary rounded-circle p-1"
                      htmlFor="quantity-1"
                      style={{ width: "40px", height: "40px" }}>
                      1
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="quantity"
                      id="quantity-2"
                    />
                    <label
                      className="btn btn-outline-primary rounded-circle p-1"
                      htmlFor="quantity-2"
                      style={{ width: "40px", height: "40px" }}>
                      2
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="quantity"
                      id="quantity-3"
                    />
                    <label
                      className="btn btn-outline-primary rounded-circle p-1"
                      htmlFor="quantity-3"
                      style={{ width: "40px", height: "40px" }}>
                      3
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="quantity"
                      id="quantity-4"
                    />
                    <label
                      className="btn btn-outline-primary rounded-circle p-1"
                      htmlFor="quantity-4"
                      style={{ width: "40px", height: "40px" }}>
                      4+
                    </label>
                  </div>
                  <div className="row align-items-center mt-3">
                    <div className="col-5">
                      <label htmlFor="min-input">Min Price</label>
                      <input
                        type="number"
                        id="min-input"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-2 border-3 border-bottom pt-4"></div>
                    <div className="col-5">
                      <label htmlFor="max-input">Max Price</label>
                      <input
                        type="number"
                        id="max-input"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="form-check form-switch d-flex justify-content-between p-0 mt-2">
                    <label
                      className="form-check-label"
                      htmlFor="estimated-fees-input">
                      Show prices with estimated fees
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="estimated-fees-input"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="sort-select">Sort by</label>
                    <select
                      name="sort"
                      id="sort-select"
                      className="form-select form-select-sm">
                      <option value="Price">Price - Low to High</option>
                      <option value="Price">Price - High to Low</option>
                      <option value="Section">Section - Ascending</option>
                      <option value="Section">Section - Descending</option>
                      <option value="Row">Row - Ascending</option>
                      <option value="Row">Row - Descending</option>
                    </select>
                  </div>
                  <div className="form-check form-switch d-flex justify-content-between p-0 mt-3">
                    <label
                      className="form-check-label"
                      htmlFor="mobile-delivery-input">
                      Mobile Delivery
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="mobile-delivery-input"
                    />
                  </div>

                  <input
                    type="submit"
                    value={"Done"}
                    className="btn btn-sm btn-info w-100 mt-3"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="list-group list-group-flush overflow-auto">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.ID} {...ticket} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TicketPage;
