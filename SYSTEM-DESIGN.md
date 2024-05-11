# System Design

This document describes the early high level design considerations

## Requirements

### Functional Requirements

1. A user can create and manage projects, and invite other users into the project.
2. A user can add tickets to the product backlog, and move tickets to start a sprint.
3. Members in the project should be able to update statuses of tickets, add comments, story points, sub-tasks of tickets.
4. A user should be able to group tickets into larger Epics.

### Non-functional Requirements

1. The system should have high availability and reliability

### Traffic & User Estimates

This application is assumed to have 10 monthly active users (MAU). On average, 2 project will be created monthly
and a user will create 15 tickets a month. Performing some calculations:

- 10 users x 15 tickets x 1 month = 150 tickets a month
- 2 project x 1 month = 2 projects a month

## Data Models

## Services

### Project Service

#### 1. `createProject(project: Project) -> Project`

- Creates a project record in the database

#### 2. `getProject(id: string) -> Project`

Retrieves a project by its ID

#### 3. `addMembersToProject(memberIds: string[], projectId: string) -> void`

- Adds a list of users to a project

#### 4. `removeMemberFromProject(memberIds: string[], projectId: string) -> void`

- Removes a list of users from a project

#### 5. `updateProject(updatedProject: Project, id: string) -> Project`

- Updates an existing project record in the database

#### 6. `getProjectsOfUser(userId: string) -> Projects[]`

- Retrieves projects that this user created and invited in

#### 7. `promoteMemberToAdmin(userId: string, projectId: string) -> void`

- Promotes an existing member of a project to an administrator

#### 8. `demoteAdminToMember(userId: string, projectId: string) -> void`

- Demotes an existing administrator of a project to a member

#### 9. `deleteProject(id: string) -> Project`

- Deletes an existing project by a project ID

### Epic Service

#### 1. `createEpic(epic: Epic, projectId: string) -> Epic`

- Creates a new epic under a project

#### 2. `updateEpic(updatedEpic: Epic, id: string) -> Epic`

- Updates an existing epic

#### 3. `addTicketToEpic(ticketId: string, epicId: string) -> void`

- Adds a ticket to an existing Epic

#### 4. `removeTicketFromEpic(ticketId: string, epicId: string) -> void`

- Removes a ticket from an existing Epic

#### 5. `deleteEpic(id: string) -> Epic`

- Deletes an epic from the database

### Sprint Service

#### 1. `startSprint(projectId: string, newSprint: Sprint) -> Sprint`

- Starts a sprint in a project

#### 2. `endSprint(sprintId: string, projectId: string) -> void`

- Ends an active sprint in a project

#### 3. `getSprints(ids: string[]) -> Sprint[]`

- Retrieves a list of sprint by sprint IDs

### Ticket Service

#### 1. `createTicket(projectId: string, newTicket: Ticket) -> Ticket`

- Creates a new ticket for a project

#### 2. `updateTicket(updatedTicket: Ticket, id: string) -> Ticket`

- Updates an existing ticket using ticket ID

#### 3. `deleteTicket(id: string) -> void`

- Deletes an existing ticket

#### 4. `getTickets(ids: string[]) -> Ticket[]`

- Retrieves a list of tickets from given list of ticket IDs

### Subtask Service

#### 1. `createSubtask(ticketId: string, newSubtask: Subtask) -> Subtask`

- Creates a new subtask for a ticket

#### 2. `updateSubtask(id: string, updatedSubtask: Subtask) -> Subtask`

- Updates an existing subtask by the subtask ID

#### 3. `deleteSubtask(id: string) -> void`

- Deletes an existing subtask in the database.

#### 4. `getSubtasks(ids: string[]) -> Subtask[]`

- Returns a list of subtasks by subtask IDs
