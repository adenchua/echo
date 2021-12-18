import React, { createContext, useState, ReactNode, useCallback } from "react";
import _ from "lodash";

import StoryInterface, { TicketUpdateFieldsType } from "../../types/StoryInterface";

interface TicketsContextProviderProps {
  children: ReactNode;
}

type TicketsContextStateType = {
  tickets: StoryInterface[];
  addTicket: (tickets: StoryInterface) => void;
  updateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => void;
  removeCompletedTickets: () => void;
  handleSetTickets: (newTickets: StoryInterface[]) => void;
  deleteTicket: (ticketId: string) => void;
};

const ticketContextDefaultValues: TicketsContextStateType = {
  tickets: [],
  addTicket: () => {},
  updateTicket: () => {},
  removeCompletedTickets: () => {},
  handleSetTickets: () => {},
  deleteTicket: () => {},
};

export const TicketsContext = createContext<TicketsContextStateType>(ticketContextDefaultValues);

const TicketsContextProvider = ({ children }: TicketsContextProviderProps): JSX.Element => {
  const [tickets, setTickets] = useState<StoryInterface[]>([]);

  const addTicket = useCallback((newTicket: StoryInterface): void => {
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

  const handleSetTickets = useCallback((newTickets: StoryInterface[]): void => {
    setTickets(newTickets);
  }, []);

  return (
    <TicketsContext.Provider
      value={{ tickets, addTicket, updateTicket, removeCompletedTickets, handleSetTickets, deleteTicket }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsContextProvider;
