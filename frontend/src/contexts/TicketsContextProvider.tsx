import React, { createContext, useState, ReactNode, useCallback } from "react";
import _ from "lodash";

import TicketInterface, { TicketUpdateFieldsType } from "../types/TicketInterface";

interface TicketsContextProviderProps {
  children: ReactNode;
}

type TicketsContextStateType = {
  tickets: TicketInterface[];
  addTicket: (tickets: TicketInterface) => void;
  updateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => void;
  removeCompletedTickets: () => void;
  handleSetTickets: (newTickets: TicketInterface[]) => void;
  deleteTicket: (ticketId: string) => void;
  addSubtaskIdToTicket: (ticketId: string, subtaskId: string) => void;
};

const ticketContextDefaultValues: TicketsContextStateType = {
  tickets: [],
  addTicket: () => {},
  updateTicket: () => {},
  removeCompletedTickets: () => {},
  handleSetTickets: () => {},
  deleteTicket: () => {},
  addSubtaskIdToTicket: () => {},
};

export const TicketsContext = createContext<TicketsContextStateType>(ticketContextDefaultValues);

const TicketsContextProvider = ({ children }: TicketsContextProviderProps): JSX.Element => {
  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  const addTicket = useCallback((newTicket: TicketInterface): void => {
    setTickets((prevState) => [...prevState, newTicket]);
  }, []);

  const updateTicket = useCallback((ticketId: string, updatedFields: TicketUpdateFieldsType): void => {
    setTickets((prevState) =>
      prevState.map((ticket) => {
        if (ticket._id === ticketId) {
          ticket = _.merge({}, ticket, updatedFields);
        }
        return ticket;
      })
    );
  }, []);

  const deleteTicket = useCallback(
    (ticketId: string): void => {
      const filteredTickets = tickets.filter((ticket) => ticket._id !== ticketId);
      setTickets(filteredTickets);
    },
    [tickets]
  );

  const removeCompletedTickets = useCallback((): void => {
    const incompleteTickets = tickets.filter((ticket) => ticket.status !== "completed");
    setTickets(incompleteTickets);
  }, [tickets]);

  const handleSetTickets = useCallback((newTickets: TicketInterface[]): void => {
    setTickets(newTickets);
  }, []);

  const addSubtaskIdToTicket = (ticketId: string, subtaskId: string): void => {
    setTickets((prevState) =>
      prevState.map((ticket) => {
        if (ticket._id === ticketId) {
          ticket.subtaskIds = [...ticket.subtaskIds, subtaskId];
        }
        return ticket;
      })
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
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsContextProvider;
