import { TicketFilterType } from "../components/TicketFilter";
import TicketInterface from "../types/TicketInterface";

const getFilteredTickets = (filterSelection: TicketFilterType, tickets: TicketInterface[]): TicketInterface[] => {
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
    case "epic":
      return tickets.filter((ticket) => ticket.epicId === filterValue);
    default:
      return tickets; // invalid filter
  }
};

export default getFilteredTickets;
