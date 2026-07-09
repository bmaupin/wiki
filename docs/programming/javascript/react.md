---
title: React
---

## Hooks

#### [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext)

Use this if you have state that you need to share across multiple components and don't want to pass the state through props.

#### [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer)

Use this in a component that has complex state (e.g. form data)

Some vocabulary:

- Reducer: takes a state and an action, and returns a new state depending on the action
- Action: an object with a mandatory `type` property (string representing what action is being performed) and other optional properties such as `payload` (data to pass in the action to the reducer)
- Dispatch: `useReducer` returns a state object and a dispatch function. The dispatch function can be called with an action to update the state.

`useReducer` can be combined with `useContext` to share state across multiple components.

**Note** that `useReducer` is modeled after [React Redux](https://react-redux.js.org/), which has additional features (middleware, dev tools). Many projects would probably be fine with `useReducer`, but React Redux is an alternative for projects that would like the additional functionality.
