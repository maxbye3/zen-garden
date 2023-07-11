import { useEffect, useState } from "react";
import styles from './styles.module.css';

const ToggleGrid: React.FC = () => {
  const [isGrid, setGrid] = useState<boolean>(false);
  return (
   <button className={styles.button} onClick={() => {
    setGrid(!isGrid);

    const grids = document.getElementsByClassName('grid-square');

    for (let i = 0; i < grids.length; i++) {
      const grid = grids[i] as HTMLElement;
      if(isGrid){
        grid.style.border = '0.5px solid #ccc';
      } else {
        grid.style.border = 'none';
      }
    }


   }}> {isGrid ? 'Hide Grid' : 'Show Grid'} </button>
  );
};

export default ToggleGrid