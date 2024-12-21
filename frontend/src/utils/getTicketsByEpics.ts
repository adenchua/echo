import Ticket from "../types/Ticket";
import { TicketsByEpic } from "../types/TicketsByEpic";

const getTicketsByEpics = (tickets: Ticket[]): TicketsByEpic[] => {
  const ticketsByEpics: TicketsByEpic[] = [];
  const temp: { [key: string]: Ticket[] } = {
    others: [], // others as default key for tickets without any epic
  };

  for (const ticket of tickets) {
    if (!ticket.epicId) {
      temp.others.push(ticket);
      continue;
    }
    if (!temp[ticket.epicId]) {
      temp[ticket.epicId] = [];
    }
    temp[ticket.epicId].push(ticket);
  }

  for (const key in temp) {
    ticketsByEpics.push({ epicId: key, tickets: temp[key] });
  }

  return ticketsByEpics;
};

export default getTicketsByEpics;
