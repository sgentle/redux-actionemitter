const emitterMiddleware = () => next => (event, data) =>
  data ? next({ type: event, ...data }) : next(event);

export default emitterMiddleware;
