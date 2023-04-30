import { useState } from "react";
import catImage from "./cat.jpg"; // Import an image of a cat

const GRID_SIZE = 10;

const Grid = () => {
  const [squares, setSquares] = useState<boolean[][]>(
    Array(GRID_SIZE)
      .fill(false)
      .map(() => Array(GRID_SIZE).fill(false))
  );

  const [prevRow, setPrevRow] = useState<number | null>(null);
  const [prevCol, setPrevCol] = useState<number | null>(null);

  const handleSquareClick = (row: number, col: number) => {
    if (
      prevRow === null ||
      prevCol === null ||
      (prevRow === row && Math.abs(prevCol - col) === 1) ||
      (prevCol === col && Math.abs(prevRow - row) === 1)
    ) {
      setSquares((prev) => {
        const copy = [...prev];
        copy[row][col] = true;
        setPrevRow(row);
        setPrevCol(col);
        return copy;
      });
    }
  };

  const numFilledSquares = squares.flat().filter(Boolean).length;

  return (
    <div>
      <table>
        <tbody>
          {squares.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((filled, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundImage: filled ? `url(${catImage})` : "",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    border: "1px solid black",
                  }}
                  onMouseEnter={() => handleSquareClick(rowIndex, colIndex)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>Number of filled squares: {numFilledSquares}</div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1>Grid</h1>
      <Grid />
    </div>
  );
}
