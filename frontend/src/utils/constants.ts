export const SERVER_API_URL = "/api";

export const UMS_API_URL = process.env.REACT_APP_UMS_API_URL || "http://localhost:5100";

export const APP_VERSION = "1.5.1";

export const TICKET_DRAWER_WIDTH = 480;

export const DRAWER_WIDTH = 240;

export const LOCAL_STORAGE_UID_KEY = "uid";

export const PROJECT_TYPES = [
  "Software Engineering",
  "Exploratory Data Analysis",
  "UX Design",
] as const;
