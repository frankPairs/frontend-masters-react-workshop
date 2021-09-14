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
      initial: 'normal',
      states: {
        normal: {
          always: [
            {
              target: 'overtime',
              cond: isTimeExceeded,
            },
          ],
          on: {
            RESET: undefined
          }
        },
        overtime: {
          on: {
            TOGGLE: undefined,
          }
        }
      },
      on: {
        TICK: {
          actions: 'increaseElapsed',
        },
        RESET: 'idle',
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
    'isTimeExceeded': isTimeExceeded
  }
});

function isTimeExceeded(context, event) {
  return context.elapsed + context.interval > context.duration;
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