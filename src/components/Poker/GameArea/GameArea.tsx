import React from "react";
import { Game, Player } from "@/types";
import { GameController } from "@/components";
import { CardPicker, Players } from "@/components/Players";
import "./GameArea.css";

interface GameAreaProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
export const GameArea: React.FC<GameAreaProps> = ({
  game,
  players,
  currentPlayerId,
}) => {
  return (
    <>
      <div className="ContentArea">
        <Players
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
        <GameController game={game} currentPlayerId={currentPlayerId} />
      </div>
      <div className="Footer">
        <CardPicker
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
      </div>
    </>
  );
};

export default GameArea;
