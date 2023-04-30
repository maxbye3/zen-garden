import { useState } from "react";

const Grid: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array(10).fill(Array(10).fill(0))
  );
  const [currentColor, setCurrentColor] = useState<number>(1);
  const [prevX, setPrevX] = useState<number | null>(null);
  const [prevY, setPrevY] = useState<number | null>(null);
  const [previousDirection, setPreviousDirection] = useState("");
  const numUnfilledSquares = grid.reduce(
    (acc, row) => acc + row.filter((col) => col === 0).length,
    0
  );

  // function to generate random number between min and max (inclusive)
  const getRandomIntInclusive = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSquareClick = (x: number, y: number): void => {
    const styleSheet = document.styleSheets[0]; // get the first stylesheet in the document
    // onhover cover tile
    const currentTile = `.color-${currentColor} { background-color: purple}`;
    styleSheet.insertRule(currentTile); // insert the CSS class into the stylesheet

    if (grid[x][y] !== 0) {
      console.log(`Square (${x}, ${y}) is already filled.`);
      return;
    }
    if (prevX === null || prevY === null) {
      console.log(`Square (${x}, ${y}) is the first filled square.`);
      const newGrid = grid.map((row, i) =>
        row.map((col, j) => (i === x && j === y ? currentColor : col))
      );
      setGrid(newGrid);
      setCurrentColor(currentColor + 1);
      setPrevX(x);
      setPrevY(y);
    } else {
      const dx = x - prevX;
      const dy = y - prevY;
      let direction: string;
      let borderPos,
        borderRadius: string | boolean = false,
        angle = "";
      if (dx === 1 && dy === 0) {
        if (previousDirection === "left") {
          borderRadius = "300px 0 0 0";
          borderPos = "100% 100%";
        } else if (previousDirection === "right") {
          borderRadius = "0 300px 0 0";
          borderPos = "0 100%";
        } else {
          angle = "90deg";
        }
        direction = "down";
        console.log("current direction: " + direction);
      } else if (dx === -1 && dy === 0) {
        if (previousDirection === "left") {
          borderRadius = "0 0 0 300px";
          borderPos = "100% 0";
        } else if (previousDirection === "right") {
          borderRadius = "0 0 300px 0";
          borderPos = "0 0";
        } else {
          angle = "90deg";
        }
        direction = "up";
      } else if (dx === 0 && dy === 1) {
        if (previousDirection === "up") {
          borderRadius = "300px 0 0 0";
          borderPos = "100% 100%";
        } else if (previousDirection === "down") {
          borderRadius = "0 0 0 300px";
          borderPos = "100% 0";
        } else {
          angle = "0deg";
        }
        direction = "right";
      } else if (dx === 0 && dy === -1) {
        if (previousDirection === "up") {
          borderRadius = "0 300px 0 0";
          borderPos = "0 100%";
        } else if (previousDirection === "down") {
          borderRadius = "0 0 300px 0";
          borderPos = "0 0";
        } else {
          angle = "0deg";
        }
        direction = "left";
      } else {
        console.log(
          `Square (${x}, ${y}) is not adjacent to the previous square.`
        );
        return;
      }

      // style previous tiles
      const previousTileStyle = borderRadius
        ? `border-radius: ${borderRadius}; background: repeating-radial-gradient(ellipse farthest-corner at ${borderPos}, #dbd1b4 0 5%, #c2b280 5% 10%);`
        : `background: repeating-linear-gradient(${angle},#dbd1b4 0 7%,#c2b280 7% 14%)`;
      // const myClass = `.color-${currentColor} { border-radius: 0 0 0 300px; background: repeating-radial-gradient(ellipse farthest-corner at 100% 0, #dbd1b4 0 5%, #c2b280 5% 10%); }`; // define your CSS class as a string
      const previousTile = `.color-${currentColor - 1} { ${previousTileStyle}}`;
      styleSheet.insertRule(previousTile); // insert the CSS class into the stylesheet

      setPreviousDirection(direction);
      // console.log(
      //   `Square (${x}, ${y}) is filled by moving ${direction} from square (${prevX}, ${prevY}).`
      // );
      const newGrid = grid.map((row, i) =>
        row.map((col, j) => (i === x && j === y ? currentColor : col))
      );
      setGrid(newGrid);
      setCurrentColor(currentColor + 1);
      setPrevX(x);
      setPrevY(y);
    }
  };

  //

  return (
    <div>
      <div className="grid-container">
        <div className="grid-wrapper">
          <p>Number of squares unfilled: {numUnfilledSquares}</p>
          {grid.map((row, x) => (
            <div key={x} className="grid-row">
              {row.map((col, y) => (
                <div
                  key={`${x}-${y}`}
                  className={`grid-square color-${col}`}
                  onMouseEnter={() => handleSquareClick(x, y)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
