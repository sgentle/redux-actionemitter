const eventReducer = (initialState) => {
  const listeners = {};
  const reducer = (state = initialState, action) =>
    reducer.emit(action && action.type, state, action);

  reducer.on = (event, fn) => {
    (listeners[event] || (listeners[event] = [])).push(fn);
    return reducer;
  };

  reducer.removeListener = (event, fn) => {
    const index = listeners[event] && listeners[event].indexOf(fn);
    if (index > -1) {
      listeners[event].splice(index, 1);
    }
  };

  reducer.emit = (event, state, action) =>
    (event && listeners[event] || [])
      .reduce((nextstate, listener) => listener(nextstate, action), state);

  reducer.listeners = listeners;

  return reducer;
};

export default eventReducer;
