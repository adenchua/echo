import { priorityMap, TicketSortType } from "../components/TicketSortSelectDropdown";
import TicketInterface from "../types/TicketInterface";

const getSortedTickets = (sortSelection: TicketSortType, tickets: TicketInterface[]): TicketInterface[] => {
  switch (sortSelection) {
    case "priority-dsc":
      return tickets.sort((a, b) => {
        const aPriorityType = priorityMap[a.priority];
        const bPriorityType = priorityMap[b.priority];
        return bPriorityType - aPriorityType;
      });
    case "creation-asc":
      return tickets.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    default:
      return tickets; // invalid sort order
  }
};

export default getSortedTickets;
