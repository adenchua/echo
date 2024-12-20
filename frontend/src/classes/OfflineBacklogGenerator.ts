import Epic from "../types/Epic";
import Ticket, { TicketPriority, TicketStatus } from "../types/Ticket";
import { TicketsByEpic } from "../types/TicketsByEpic";
import User from "../types/User";
import getDateTimeToday from "../utils/dateUtils";

interface CSSMap {
  className: string;
  displayName: string;
}

class OfflineBacklogGenerator {
  #ticketsByEpic: TicketsByEpic[] = [];
  #projectTitle: string = "Untitled Project";
  #isProductBacklog: boolean = true;
  #usersMap: Record<string, User> = {};
  #epicsMap: Record<string, Epic> = {};

  constructor(
    ticketsByEpic: TicketsByEpic[],
    projectTitle: string,
    isProductBacklog: boolean,
    usersMap: Record<string, User>,
    epicsMap: Record<string, Epic>,
  ) {
    this.#ticketsByEpic = ticketsByEpic;
    this.#projectTitle = projectTitle;
    this.#isProductBacklog = isProductBacklog;
    this.#usersMap = usersMap;
    this.#epicsMap = epicsMap;
  }

  generateTicketSection(epicTitle: string, tickets: Ticket[]): string {
    return `<div class="ticket-section">
      <h4 class="ticket-section-title">${epicTitle}</h4>
      ${tickets
        .map((ticket) => {
          return this.generateTicket(ticket);
        })
        .join("")}
    </div>`;
  }

  generateTicketPriority(priority: TicketPriority): string {
    const priorityMap: Record<TicketPriority, CSSMap> = {
      low: {
        className: "low-priority",
        displayName: "Low",
      },
      medium: {
        className: "medium-priority",
        displayName: "Medium",
      },
      high: {
        className: "high-priority",
        displayName: "High",
      },
      highest: {
        className: "urgent-priority",
        displayName: "Urgent",
      },
    };

    return `<div class="chip ${priorityMap[priority].className}">
      ${priorityMap[priority].displayName}
    </div>`;
  }

  generateTicketStatus(status: TicketStatus): string {
    const statusMap: Record<TicketStatus, CSSMap> = {
      todo: {
        className: "status-to-do",
        displayName: "To Do",
      },
      progress: {
        className: "status-in-progress",
        displayName: "In Progress",
      },
      review: {
        className: "status-review",
        displayName: "Review",
      },
      completed: {
        className: "status-done",
        displayName: "Done",
      },
      stuck: {
        className: "status-stuck",
        displayName: "Stuck",
      },
      hold: {
        className: "status-hold",
        displayName: "Hold",
      },
    };

    return `<div class="ticket-status ${statusMap[status].className}">${statusMap[status].displayName}</div>`;
  }

  generateTicket = (ticket: Ticket): string => {
    const { ticketNumber, priority, title, status, assigneeId } = ticket;
    const member = this.#usersMap[assigneeId];

    const getAssigneeString = assigneeId
      ? `<div class="ticket-assignee">${member.displayName}</div>`
      : "";

    return `<div class="ticket">
      ${this.generateTicketPriority(priority)}
      <p class="subtitle">#${ticketNumber}</p>
      <p>${title}</p>
      <div class="flex-grow"></div>
      ${getAssigneeString}
      ${this.generateTicketStatus(status)}
    </div>`;
  };

  generateHtmlDocument = (): string => {
    return `<!DOCTYPE html>
        <head>
          <title>echo.yl - Offline View</title>
        </head>
        <style>
            p {
              margin: 0px;
            }
            h1 {
              margin: 0px;
            }
            h2 {
              margin: 0px;
            }
            h3 {
              margin: 0px;
            }
            h4 {
              margin: 0px;
            }
            h5 {
              margin: 0px;
            }
            h6 {
              margin: 0px;
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0px;
              padding: 0px;
            }
            .container {
              max-width: 960px;
              width: 100%;
              margin: auto;
            }
            .subtitle {
              color: #00000060;
              font-size: 12px;
            }
            .header-background {
              background-color: #F6F6F6;
              padding: 16px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .ticket-section {
              margin: 48px 0px;
            }
            .ticket-section-title {
              margin-bottom: 8px;
            }
            .ticket {
              display: flex;
              align-items: center;
              gap: 8px;
              background-color: #F6F6F6;
              border-radius: 4px;
              padding: 8px;
              margin-bottom: 8px;
            }
            .chip {
              border-radius: 50px;
              border: 1px solid;
              padding: 4px 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              width: 52px;
            }
            .low-priority {
              border-color: mediumseagreen;
              color: mediumseagreen;
            }
            .medium-priority {
              border-color: orange;
              color: orange;
            }
            .high-priority {
              border-color: #eb4040;
              color: #eb4040;;
            }
            .urgent-priority {
              border-color: #eb4040;
              color: #eb4040;;
            }
            .ticket-status {
              border-radius: 50px;
              padding: 8px 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 96px;
              white-space: nowrap;
              font-size: 14px;
            }
            .status-to-do {
              background-color: #E9E9E9;
            }
            .status-in-progress {
              background-color: orange;
            }
            .status-stuck {
              background-color: #EF5350;
              color: #FFF;
            }
            .status-hold {
              background-color: #757575;
              color: #FFF;
            }
            .status-review {
              background-color: #BA68C8;
              color: #FFF;
            }
            .status-done {
              background-color: #4CAF50;
              color: #FFF;
            }
            .flex-grow {
              flex-grow: 1;
            }
            .ticket-assignee {
              border-radius: 4px;
              padding: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;
              font-size: 14px;
              background-color: #E9E9E9;
            }
          </style>
        <body>
          <div class="container">
            <div class="header-background">
              <h5>echo.yl - offline view</h5>
              <h1>${this.#projectTitle} (${this.#isProductBacklog ? "Product" : "Sprint"} Backlog)</h2>
              <p class="subtitle">Report generated: ${getDateTimeToday()}</p>
            </div>
            ${this.#ticketsByEpic
              .map((ticketByEpic) => {
                const { tickets, epicId } = ticketByEpic;
                const epicTitle = this.#epicsMap[epicId]?.title ?? "Others";

                return this.generateTicketSection(epicTitle, tickets);
              })
              .join("")}
          </div>
        </body>
      </html>`;
  };
}

export default OfflineBacklogGenerator;
