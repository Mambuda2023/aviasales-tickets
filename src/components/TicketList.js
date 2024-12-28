import React from "react";
import TicketData from "./TicketData";

const TicketList = ({ ticketData }) => {
  const TicketItems = ticketData.map((val, key) => (
    <TicketData ticketData={val} key={key} />
  ));

  return <div className="product-list__ticket">{TicketItems}</div>;
};

export default TicketList;
