export function wait(ms) {
  let start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}