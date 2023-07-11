import React from 'react';
import styles from './styles.module.css';

interface ResetGameProps {
  reset: () => void;
}

export const ResetGame: React.FC<ResetGameProps> = ({ reset }) => {
  return (
    <button className={styles.button} onClick={reset}>
      Reset Game
    </button>
  );
};