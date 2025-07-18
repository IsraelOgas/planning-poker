import { Grow } from "@material-ui/core";
import React from "react";
import { Game, Player } from "@/types";
import { PlayerCard } from "./PlayerCard/PlayerCard";
import "./Players.css";

interface PlayersProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
export const Players: React.FC<PlayersProps> = ({
  game,
  players,
  currentPlayerId,
}) => {
  // Filtra jugadores duplicados por id
  const uniquePlayers = [...new Map(players.map(p => [p.id, p])).values()];
  return (
    <Grow in={true} timeout={800}>
      <div className="PlayersContainer">
        {uniquePlayers.map((player: Player) => (
          <PlayerCard
            key={player.id}
            game={game}
            player={player}
            currentPlayerId={currentPlayerId}
          />
        ))}
      </div>
    </Grow>
  );
};
