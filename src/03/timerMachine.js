import { createMachine, assign } from 'xstate';

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: 'resetTimer',

      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: 'addOneMinute',
        },
        TICK: {
          actions: 'incrementElapsed'
        }
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
}, {
  actions: {
    resetTimer: assign(resetTimer),
    addOneMinute: assign(addOneMinute),
    incrementElapsed: assign(incrementElapsed)
  }
});

function addOneMinute(context, event) {
  return {...context, duration: context.duration + 60};
}

function resetTimer(context, event) {
  return {
    ...context,
    duration: 60,
    elapsed: 0,
  };
}

function incrementElapsed(context, event) {
  return {...context, elapsed: context.elapsed + context.interval };
}