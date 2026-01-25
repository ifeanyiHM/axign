export function logMiddleware(req: Request) {
  return { response: req.method + " " + req.url };
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}
