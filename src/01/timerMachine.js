import { createMachine } from 'xstate';

export const timerMachineConfig = {
    initial: 'idle',
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

export const timerMachine = createMachine(timerMachineConfig);

