# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-02

### ADDED

- tooltip to subtask actions for clarity

### CHANGED

- docker configurations to use values from env instead of modifying url directly
- project description to show line breaks correctly
- saving project settings state to show success state upon saving
- subtask look and design
- tickets look and design
- user avatar to be consistent in design
- team members table look and feel
- CTA buttons from outline variant to contained variant for consistency

## [1.0.0] - 2024-03-01

### CHANGED

- date picker to show up when editing date instead of having to click the button first

## [1.6.0-a] - 2022-12-03

### CHANGED

- ticket filter bar is now fixed for product and sprint backlogs when scrolling so its visible at all times.

## [1.5.0-a] - 2022-09-25

### ADDED

- temporary confirmation dialog when trying to delete a subtask
- temporary confirmation dialog when trying to remove a member from the project
- text hint to team members dialog if there are no available members to add into the project
- additional filter to show tickets not in any sprint for both product and sprint backlogs

### CHANGED

- members in the project will now reflect a proper title instead of software engineer
- introduced maximum height for assignee popper
- icon of start and end sprint to a calendar icon
- team objectives term to epic to reduce confusion

## [1.4.1-a] - 2022-07-16

### FIXED

- ticket creation form to overflow on smaller screens

## [1.4.0-a] - 2022-06-28

### ADDED

- sub tasks feature for each ticket

### CHANGED

- project overview tab members listing to expand the full width instead of a maximum height scroll
- increased width of the right ticket drawer to allow space for sub-tasks
- added story points of 0, 13, 20 to the estimation pool
- positioning of edit buttons for ticket drawer
- improved visibility of ticket priority and type edit button icons

## [1.3.0-a] - 2022-04-02

### CHANGED

- login mechanism to persist in storage. Users can now refresh the page without redirecting to login page
- overall look of product and sprint backlog ticket display

### REMOVED

- filter by epic as tickets are already separated by epics

## [1.2.1-a] - 2022-03-07

### FIXED

- deletion of ticket does not remove it from the epic

### CHANGED

- increased width of the ticket drawer

## [1.2.0-a] - 2022-02-05

### FIXED

- members of a project able to delete a project

### CHANGED

- delete ticket to have a confirmation modal to prevent accidental deletions
- increased width of ticket drawer to accomodate windows scroll bar
- ticket drawer description label to notes

## [1.1.0-a] - 2022-01-23

### ADDED

- story points to tickets.
