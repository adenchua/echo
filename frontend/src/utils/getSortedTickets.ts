import { priorityMap, TicketSortType } from "../components/TicketSortSelectDropdown";
import Ticket from "../types/Ticket";

const getSortedTickets = (sortSelection: TicketSortType, tickets: Ticket[]): Ticket[] => {
  switch (sortSelection) {
    case "priority-dsc":
      return tickets.sort((a, b) => {
        const aPriorityType = priorityMap[a.priority];
        const bPriorityType = priorityMap[b.priority];
        return bPriorityType - aPriorityType;
      });
    case "creation-asc":
      return tickets.sort(
        (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
      );
    default:
      return tickets; // invalid sort order
  }
};

export default getSortedTickets;
