export async function wait(seconds: number) {
  return new Promise(res => setTimeout(res, seconds))
}

export const sleep = (seconds: number) => new Promise(res => setTimeout(res, seconds * 1000))
