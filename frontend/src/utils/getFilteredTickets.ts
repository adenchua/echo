import { TicketFilterType } from "../components/TicketFilter";
import Ticket from "../types/Ticket";

const getFilteredTickets = (filterSelection: TicketFilterType, tickets: Ticket[]): Ticket[] => {
  if (!filterSelection) {
    return tickets;
  }

  const [filterKeyType, filterValue] = filterSelection.split("-");

  switch (filterKeyType) {
    case "assignee":
      return tickets.filter((ticket) => ticket.assigneeId === filterValue);
    case "not_status":
      return tickets.filter((ticket) => ticket.status !== filterValue);
    case "status":
      return tickets.filter((ticket) => ticket.status === filterValue);
    default:
      return tickets; // invalid filter
  }
};

export default getFilteredTickets;
