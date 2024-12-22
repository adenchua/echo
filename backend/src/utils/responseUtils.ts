interface PayloadResponse<T> {
  data: T;
  timestamp: string;
  status: string;
}

export function wrapResponse<T>(payload: T): PayloadResponse<T> {
  return { data: payload, timestamp: new Date().toISOString(), status: "success" };
}
