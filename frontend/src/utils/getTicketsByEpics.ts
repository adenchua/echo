import TicketInterface from "../types/TicketInterface";
import { TicketsByEpicInterface } from "../types/TicketsByEpicInterface";

const getTicketsByEpics = (tickets: TicketInterface[]): TicketsByEpicInterface[] => {
  let ticketsByEpics: TicketsByEpicInterface[] = [];
  let temp: { [key: string]: TicketInterface[] } = {
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
