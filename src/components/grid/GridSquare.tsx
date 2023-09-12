// GridSquare.tsx
import React from "react";

interface GridSquareProps {
  color: number;
  isFilled: boolean;
  onClick: () => void;
}

const GridSquare: React.FC<GridSquareProps> = ({ color, isFilled, onClick }) => {
  return (
    <div
      className={`grid-square color-${color} ${isFilled ? "filled-square" : ""}`}
      onClick={onClick}
    />
  );
};

export default GridSquare;
