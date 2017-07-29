export function bindHandler(io, handler) {
  return (message) => {
    return handler(io, message);
  };
}
