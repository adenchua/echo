export async function sleep(durationInMilliSeconds: number): Promise<void> {
  await new Promise((r) => setTimeout(r, durationInMilliSeconds));
}
