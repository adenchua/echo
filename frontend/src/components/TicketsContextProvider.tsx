import React, { createContext, useState, ReactNode } from "react";
import _ from "lodash";

import StoryInterface, { TicketUpdateFieldsType } from "../types/StoryInterface";

interface TicketsContextProviderProps {
  children: ReactNode;
}

type TicketsContextStateType = {
  tickets: StoryInterface[];
  addTickets: (tickets: StoryInterface[]) => void;
  updateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => void;
  removeCompletedTickets: () => void;
};

const ticketContextDefaultValues: TicketsContextStateType = {
  tickets: [],
  addTickets: () => {},
  updateTicket: () => {},
  removeCompletedTickets: () => {},
};

export const TicketsContext = createContext<TicketsContextStateType>(ticketContextDefaultValues);

const TicketsContextProvider = ({ children }: TicketsContextProviderProps): JSX.Element => {
  const [tickets, setTickets] = useState<StoryInterface[]>([]);

  const addTickets = (tickets: StoryInterface[]): void => {
    setTickets((prevState) => [...prevState, ...tickets]);
  };

  const updateTicket = (ticketId: string, updatedFields: TicketUpdateFieldsType): void => {
    setTickets((prevState) =>
      prevState.map((ticket) => {
        if (ticket._id === ticketId) {
          ticket = _.merge({}, ticket, updatedFields);
        }
        return ticket;
      })
    );
  };

  const removeCompletedTickets = (): void => {
    const incompleteTickets = tickets.filter((ticket) => ticket.status !== "completed");
    setTickets(incompleteTickets);
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTickets, updateTicket, removeCompletedTickets }}>
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsContextProvider;
