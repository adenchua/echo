export async function sleep(durationInMilliSeconds: number) {
  await new Promise((r) => setTimeout(r, durationInMilliSeconds));
}
