import { useState } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridRow = styled.div`
  display: flex;
`;

const GridSquare = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
`;

const Color1 = styled(GridSquare)`
  background-color: #ff0000;
`;

const Color2 = styled(GridSquare)`
  background-color: #00ff00;
`;

const Color3 = styled(GridSquare)`
  background-color: #0000ff;
`;

const Grid: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array(10).fill(Array(10).fill(0))
  );
  const [currentColor, setCurrentColor] = useState<number>(1);
  const [prevX, setPrevX] = useState<number | null>(null);
  const [prevY, setPrevY] = useState<number | null>(null);

  const handleSquareClick = (x: number, y: number): void => {
    if (grid[x][y] !== 0) {
      return;
    }
    if (prevX === null || prevY === null || x === prevX || y === prevY) {
      const newGrid = grid.map((row, i) =>
        row.map((col, j) => (i === x && j === y ? currentColor : col))
      );
      setGrid(newGrid);
      if (currentColor < 3) {
        setCurrentColor(currentColor + 1);
      } else {
        setCurrentColor(1);
      }
      setPrevX(x);
      setPrevY(y);
    }
  };

  const getColorComponent = (color: number): React.FC => {
    switch (color) {
      case 1:
        return Color1;
      case 2:
        return Color2;
      case 3:
        return Color3;
      // etc. for each color
      default:
        return GridSquare;
    }
  };

  return (
    <GridContainer>
      {grid.map((row, x) => (
        <GridRow key={x}>
          {row.map((col, y) => {
            const ColorComponent = getColorComponent(col);
            return (
              <ColorComponent
                key={`${x}-${y}`}
                onClick={() => handleSquareClick(x, y)}
              />
            );
          })}
        </GridRow>
      ))}
    </GridContainer>
  );
};

export default Grid;
