import { useState } from "react";

export default function ClickMove() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  };

  return (
    <div className="game-area" onClick={handleClick}>
      <div
        className="player"
        style={{
          left: pos.x + "px",
          top: pos.y + "px"
        }}
      />
    </div>
  );
}