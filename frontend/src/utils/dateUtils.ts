import { format } from "date-fns";

const getDateTimeToday = (): string => {
  return format(new Date(), "dd MMMM yyyy, pppp");
};

export default getDateTimeToday;
