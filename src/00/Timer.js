import * as React from 'react';
import { useReducer } from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressCircle } from '../ProgressCircle';

// Import the timer machine and its initial state:
import { timerMachine, timerMachineConfig } from './timerMachine';

export const Timer = () => {
  const [state, dispatch] = useReducer(timerMachine, timerMachineConfig.initital);

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  function toggleTimer() {
    dispatch({ type: "TOOGLE"});
  }

  function resetTimer() {
    dispatch({ type: "RESET"});
  }

  return (
    <div
      className="timer"
      data-state={state}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 00</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state}</div>
        <div
          className="elapsed"
          onClick={toggleTimer}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        {state === "paused" && <div className="controls">
          <button
              onClick={resetTimer}
          >
            Reset
          </button>
        </div>}
      </div>
      <div className="actions">
        {state === "running" && <button
            onClick={toggleTimer}
            title="Pause timer"
        >
          <FontAwesomeIcon icon={faPause} />
        </button>}

        {(state === "paused" || state === "idle") && <button
            onClick={toggleTimer}
            title="Start timer"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>}
      </div>
    </div>
  );
};
