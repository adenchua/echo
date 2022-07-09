import Ticket from "./Ticket";

export interface TicketsByEpic {
  epicId: string;
  tickets: Ticket[];
}
