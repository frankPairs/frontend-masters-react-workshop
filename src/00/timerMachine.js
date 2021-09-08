export const timerMachineConfig = {
  initital: 'idle',
  states: {
    'idle': {
      on: {
        "TOOGLE": 'running'
      }
    },
    'running': {
      on: {
        "TOOGLE": 'paused'
      }
    },
    'paused': {
      on: {
        "TOOGLE": 'running',
        "RESET": 'idle'
      }
    }
  }
};

export const timerMachine = (state, event) => {
  return timerMachineConfig.states[state].on[event.type] || state;
};
