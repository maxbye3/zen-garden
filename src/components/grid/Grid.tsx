// // Grid.tsx
// import React, { useState } from "react";
// import GridRow from "./GridRow";
// import ResetGame from "../components/reset-game/reset-game";
// import ToggleGrid from "../components/toggle-grid/toggle-grid";

// const Grid: React.FC = () => {
//   const [grid, setGrid] = useState<number[][]>(
//     Array(10).fill(Array(10).fill(0))
//   );
//   // Other state and logic...

//   const handleSquareClick = (x: number, y: number): void => {
//     // Handle square click logic...
//   };

//   const handleReset = () => {
//     // Reset logic here
//     console.log('reset');
//   };

//   return (
//     <>
//       <ToggleGrid />
//       <div className="grid-container">
//         {/* Other components or elements */}
//         <ResetGame reset={handleReset} />
//         <div className="grid-wrapper">
//           {grid.map((row, x) => (
//             <GridRow key={x} row={row} onSquareClick={handleSquareClick} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Grid;
