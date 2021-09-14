import { createMachine, assign } from 'xstate';

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 5,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: assign({
        duration: 5,
        elapsed: 0,
      }),
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TICK: [
          {
            actions: 'increaseElapsed',
            cond: 'isOnTime'
          },
          {
            target: 'expired'
          }
        ],
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: 'addOneMinute',
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
    expired: {
      on: {
        RESET: 'idle'
      }
    }
  }
}, {
  actions: {
    'increaseElapsed': assign(increaseElapsed),
    'addOneMinute': assign(addOneMinute)
  },
  guards: {
    'isOnTime': isOnTime
  }
});

function isOnTime(context, event) {
  return context.elapsed + context.interval < context.duration;
}

function increaseElapsed(context, event) {
  return {
    ...context,
    elapsed: context.elapsed + context.interval,
  }
}

function addOneMinute(context, event) {
  return {
    ...context,
    duration: context.duration + 60,
  };
}