import { createMachine, assign } from 'xstate';

const initialCtx = {
  duration: 60,
  elapsed: 0,
  interval: 0.1
};

export const timerMachine = createMachine({
  initial: 'idle',
  context: initialCtx,
  states: {
    idle: {
      entry: assign(resetTimer),
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: assign({
            duration: addOneMinuteDuration
          })
        }
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  }
});

function addOneMinuteDuration(context, event) {
  return context.duration + 60;
}

function resetTimer(context, event) {
  return initialCtx;
}