import { createContext, useState, ReactNode, useCallback, JSX } from "react";
import _ from "lodash";

import Ticket, { TicketUpdateFields } from "../types/Ticket";

interface TicketsContextProviderProps {
  children: ReactNode;
}

type TicketsContextStateType = {
  tickets: Ticket[];
  addTicket: (tickets: Ticket) => void;
  updateTicket: (ticketId: string, updatedFields: TicketUpdateFields) => void;
  removeCompletedTickets: () => void;
  handleSetTickets: (newTickets: Ticket[]) => void;
  deleteTicket: (ticketId: string) => void;
  addSubtaskIdToTicket: (ticketId: string, subtaskId: string) => void;
  removeSubtaskIdFromTicket: (ticketId: string, subtaskId: string) => void;
};

const ticketContextDefaultValues: TicketsContextStateType = {
  tickets: [],
  addTicket: () => {},
  updateTicket: () => {},
  removeCompletedTickets: () => {},
  handleSetTickets: () => {},
  deleteTicket: () => {},
  addSubtaskIdToTicket: () => {},
  removeSubtaskIdFromTicket: () => {},
};

export const TicketsContext = createContext<TicketsContextStateType>(ticketContextDefaultValues);

const TicketsContextProvider = ({ children }: TicketsContextProviderProps): JSX.Element => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const addTicket = useCallback((newTicket: Ticket): void => {
    setTickets((prevState) => [...prevState, newTicket]);
  }, []);

  const updateTicket = useCallback((ticketId: string, updatedFields: TicketUpdateFields): void => {
    setTickets((prevState) =>
      prevState.map((ticket) => {
        if (ticket._id === ticketId) {
          ticket = _.merge({}, ticket, updatedFields);
        }
        return ticket;
      }),
    );
  }, []);

  const deleteTicket = useCallback(
    (ticketId: string): void => {
      const filteredTickets = tickets.filter((ticket) => ticket._id !== ticketId);
      setTickets(filteredTickets);
    },
    [tickets],
  );

  const removeCompletedTickets = useCallback((): void => {
    const incompleteTickets = tickets.filter((ticket) => ticket.status !== "completed");
    setTickets(incompleteTickets);
  }, [tickets]);

  const handleSetTickets = useCallback((newTickets: Ticket[]): void => {
    setTickets(newTickets);
  }, []);

  const addSubtaskIdToTicket = (ticketId: string, subtaskId: string): void => {
    setTickets((prevState) =>
      prevState.map((ticket) => {
        if (ticket._id === ticketId) {
          ticket.subtaskIds = [...ticket.subtaskIds, subtaskId];
        }
        return ticket;
      }),
    );
  };

  const removeSubtaskIdFromTicket = (ticketId: string, subtaskId: string): void => {
    setTickets((prevState) =>
      prevState.map((ticket) => {
        if (ticket._id === ticketId) {
          ticket.subtaskIds = ticket.subtaskIds.filter((id) => id !== subtaskId);
        }
        return ticket;
      }),
    );
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicket,
        removeCompletedTickets,
        handleSetTickets,
        deleteTicket,
        addSubtaskIdToTicket,
        removeSubtaskIdFromTicket,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsContextProvider;
