// // GridRow.tsx
// import React from "react";
// import GridSquare from "./GridSquare";

// interface GridRowProps {
//   row: number[];
//   onSquareClick: (x: number, y: number) => void;
// }

// const GridRow: React.FC<GridRowProps> = ({ row, onSquareClick }) => {
//   return (
//     <div className="grid-row">
//       {row.map((col, y) => (
//         <GridSquare
//           key={y}
//           color={col}
//           isFilled={col !== 0} // Replace with your actual condition
//           onClick={() => onSquareClick(row, y)}
//         />
//       ))}
//     </div>
//   );
// };

// export default GridRow;
