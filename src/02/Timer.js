import * as React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMachine } from '@xstate/react';
import { timerMachine } from './timerMachine';
import { ProgressCircle } from '../ProgressCircle';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine);
  const { value, context } = state;
  const { duration, elapsed, interval } = context;

  function toggleTimer() {
    send({ type: 'TOGGLE' });
  }

  function resetTimer() {
    send({ type: 'RESET' });
  }

  function addOneMinute() {
    send({ type: 'ADD_MINUTE' });
  }

  return (
    <div
      className="timer"
      data-state={value}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 02</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{value}</div>
        <div className="elapsed" onClick={toggleTimer}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {value !== 'running' && (
            <button onClick={resetTimer}>Reset</button>
          )}

          <button
            onClick={addOneMinute}
          >
            + 1:00
          </button>
        </div>
      </div>
      <div className="actions">
        {value === 'running' && (
          <button onClick={toggleTimer} title="Pause timer">
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}

        {(value === 'paused' || value === 'idle') && (
          <button onClick={toggleTimer} title="Start timer">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
