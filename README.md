Redux Action Emitter
====================

This is an experimental module for representing Redux actions as events. In this model, reducers become observers, switch statements become event listeners, and `dispatch()` emits events.


How to use it
-------------

`npm install redux-actionemitter`

Action Emitter has two parts: the `eventReducer` and the `emitterMiddleware`. You can use either in isolation, or both together.


emitterMiddleware
-----------------

Attach the `emitterMiddleware` to your `store` like so:

```javascript
import { createStore, applyMiddleware } from 'redux';
import { emitterMiddleware } from 'redux-actionemitter';

const applyStore = applyMiddleware(emitterMiddleware, logger)(createStore);
```

This lets you use an EventEmitter-compatible version of `dispatch`:
```javascript
dispatch('EVENT_NAME', { data: 'goes here' });
```

Under the hood, it sets the `type` property of the object to the event name you provide. It's backwards-compatible, so you can still dispatch plain JS objects by providing only one argument.


eventReducer
------------

Initialise your reducer with the initial state, then add event listeners for each action you want to listen to. Your event listener *must* return a value synchronously, just like a regular reducer.

```javascript
import { eventReducer } from 'redux-actionemitter';

const reducer = eventReducer([]);

reducer.on('ADD_SNOWMAN', (state, action) => state.concat(['☃']));

export default reducer;
```

Much like `emitterMiddleware`, this looks at the `type` of the action object to trigger the event listeners.
