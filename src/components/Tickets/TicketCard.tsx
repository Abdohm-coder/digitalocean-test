import { GetEventTickets3Props } from "@/types/data-types";
import React from "react";

const TicketCard: React.FC<GetEventTickets3Props> = ({
  EventID,
  ActualPrice,
  TicketQuantity,
  Row,
}) => {
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action d-flex gap-2 align-items-center">
      <div className="flex-fill">
        <h6 className="m-0">Bleacher 102</h6>
        <p className="m-0 small">Row {Row}</p>
        <p className="m-0 small">1-{TicketQuantity} Tickets</p>
      </div>
      <div>
        <h6 className="m-0">${ActualPrice}/ea</h6>
      </div>
      <p className="btn btn-sm btn-info m-0">Continue</p>
    </a>
  );
};

export default TicketCard;
