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
};

const ticketContextDefaultValues: TicketsContextStateType = {
  tickets: [],
  addTicket: () => {},
  updateTicket: () => {},
  removeCompletedTickets: () => {},
  handleSetTickets: () => {},
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

  const removeCompletedTickets = useCallback((): void => {
    const incompleteTickets = tickets.filter((ticket) => ticket.status !== "completed");
    setTickets(incompleteTickets);
  }, [tickets]);

  const handleSetTickets = useCallback((newTickets: StoryInterface[]): void => {
    setTickets(newTickets);
  }, []);

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, updateTicket, removeCompletedTickets, handleSetTickets }}>
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsContextProvider;
