import { useEffect, useState } from "react";
import Image from "next/image";
import mossRock from "./image/moss-rock.png";
import spiritHouse from "./image/spirit-house.png";
import catLuck from "./image/cat.png";

const Grid: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array(10).fill(Array(10).fill(0))
  );
  const [currentColor, setCurrentColor] = useState<number>(1);
  const [prevX, setPrevX] = useState<number | null>(null);
  const [prevY, setPrevY] = useState<number | null>(null);
  const [previousDirection, setPreviousDirection] = useState("");
  const numUnrock1Squares = grid.reduce(
    (acc, row) => acc + row.filter((col) => col === 0).length,
    0
  );

  const rock1X = [6, 7, 8];
  const rock1Y = [7, 8];
  const rock2X = [2, 3];
  const rock2Y = [0, 1];
  const rock3X = [1, 2];
  const rock3Y = [7, 8];

  const handleSquareClick = (x: number, y: number): void => {
    if (rock1X.includes(x) && rock1Y.includes(y)) {
      return;
    }
    if (rock2X.includes(x) && rock2Y.includes(y)) {
      return;
    }
    const styleSheet = document.styleSheets[0]; // get the first stylesheet in the document
    // onhover cover tile
    const currentTile = `.color-${currentColor} { background-color: purple}`;
    styleSheet.insertRule(currentTile); // insert the CSS class into the stylesheet

    if (grid[x][y] !== 0) {
      // console.log(`Square (${x}, ${y}) is already rock1.`);
      return;
    }
    if (prevX === null || prevY === null) {
      // console.log(`Square (${x}, ${y}) is the first rock1 square.`);
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
        // console.log(
        //   `Square (${x}, ${y}) is not adjacent to the previous square.`
        // );
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
      //   `Square (${x}, ${y}) is rock1 by moving ${direction} from square (${prevX}, ${prevY}).`
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
          <p>
            <small>3</small>Number of squares: {numUnrock1Squares}
          </p>
          {grid.map((row, x) => (
            <div key={x} className="grid-row">
              {row.map((col, y) => (
                <>
                  {rock3X[1] === x && rock3Y[1] === y && (
                    <Image
                      src={catLuck}
                      className="catLuck"
                      alt="lucky cat statue"
                    />
                  )}
                  {rock1X[1] === x && rock1Y[1] === y && (
                    <Image
                      src={spiritHouse}
                      className="spiritHouse"
                      alt="spirit house"
                    />
                  )}
                  {rock2X[0] === x && rock2Y[0] === y && (
                    <Image
                      src={mossRock}
                      className="mossRock"
                      alt="rock with moss on"
                    />
                  )}

                  <div
                    key={`${x}-${y}`}
                    className={`grid-square color-${col} 
                  ${
                    rock1X.includes(x) && rock1Y.includes(y)
                      ? "filled-square"
                      : ""
                  }
                    ${
                      rock2X.includes(x) && rock2Y.includes(y)
                        ? "filled-square"
                        : ""
                    }
                    ${
                      rock3X.includes(x) && rock3Y.includes(y)
                        ? "filled-square"
                        : ""
                    }
                    
                    `}
                    onPointerMove={() => handleSquareClick(x, y)}
                  />
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
