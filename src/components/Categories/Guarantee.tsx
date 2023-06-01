import React from "react";
import { BsCheckLg, BsShieldCheck } from "react-icons/bs";

const Guarantee: React.FC = () => {
  return (
    <section className="border rounded p-3 bg-white">
      <div className="d-flex text-info">
        <h4>Shop Tickets Worry Free With Our 100% Guarantee</h4>
        <h1>
          <BsShieldCheck />
        </h1>
      </div>
      <ul className="list-unstyled list-stripped mt-3">
        <li className="p-2 list-group-item-info">
          <BsCheckLg className="small text-success" /> Same tickets as you ordered, or better.
        </li>
        <li className="p-2 list-group-item-info">
          <BsCheckLg className="small text-success" /> Tickets will arrive before the event
        </li>
        <li className="p-2 list-group-item-info">
          <BsCheckLg className="small text-success" /> Tickets will be valid for entry
        </li>
        <li className="p-2 list-group-item-info">
          <BsCheckLg className="small text-success" /> Refunds for canceled events
        </li>
      </ul>
      <button className="btn btn-sm btn-outline-info w-100">Read Our Full Guarantee</button>
    </section>
  );
};

export default Guarantee;
