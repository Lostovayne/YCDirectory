export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // do nodejs stuff
  } else {
    // do edge runtime stuff
  }
}
