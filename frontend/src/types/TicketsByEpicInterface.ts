import TicketInterface from "./TicketInterface";

export interface TicketsByEpicInterface {
  epicId: string;
  tickets: TicketInterface[];
}
