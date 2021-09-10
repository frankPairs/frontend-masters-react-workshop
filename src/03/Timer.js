import * as React from 'react';
import { useEffect } from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMachine } from '@xstate/react';
import { ProgressCircle } from '../ProgressCircle';

import { timerMachine } from './timerMachine';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine);

  const { duration, elapsed, interval } = state.context;

  useEffect(() => {
    const intervalId = setInterval(incrementElapsed, 1000 * interval);

    return () => clearInterval(intervalId);
  }, []);

  function incrementElapsed() {
    send({ type: 'TICK' });
  }

  function addMinute() {
    send({ type: 'ADD_MINUTE' });
  }

  function toggleTimer() {
    send({ type: 'TOGGLE' });
  }

  function resetTimer() {
    send({ type: 'RESET' });
  }

  return (
    <div
      className="timer"
      data-state={state.value}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 03</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div className="elapsed" onClick={toggleTimer}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {state.value !== 'running' && (
            <button onClick={resetTimer}>Reset</button>
          )}

          {state.value === 'running' && (
            <button onClick={addMinute}>+ 1:00</button>
          )}
        </div>
      </div>
      <div className="actions">
        {state.value === 'running' && (
          <button onClick={toggleTimer} title="Pause timer">
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}

        {(state.value === 'paused' || state.value === 'idle') && (
          <button onClick={toggleTimer} title="Start timer">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
