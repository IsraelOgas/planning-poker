import { CircularProgress, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { streamGame, streamPlayers, getCurrentPlayerId } from "@/service";
import { Game, Player } from "@/types";
import { GameArea } from "./GameArea/GameArea";
import "./Poker.css";

export const Poker = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    let effectCleanup = true;

    if (effectCleanup) {
      const currentPlayerId = getCurrentPlayerId(id);
      if (!currentPlayerId) {
        history.push(`/join/${id}`);
      }

      setCurrentPlayerId(currentPlayerId);
      setIsLoading(true);
    }

    streamGame(id).onSnapshot((snapshot) => {
      if (effectCleanup) {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (data) {
            setGame(data as Game);
            setIsLoading(false);
            return;
          }
        }
        setIsLoading(false);
      }
    });

    streamPlayers(id).onSnapshot((snapshot) => {
      if (effectCleanup) {
        const players: Player[] = [];
        snapshot.forEach((snapshot) => {
          players.push(snapshot.data() as Player);
        });
        const currentPlayerId = getCurrentPlayerId(id);
        if (!players.find((player) => player.id === currentPlayerId)) {
          history.push(`/join/${id}`);
        }
        setPlayers(players);
      }
    });

    return () => {
      effectCleanup = false;
    };
  }, [id, history]);

  if (loading) {
    return (
      <div className="PokerLoading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {game && players && currentPlayerId ? (
        <GameArea
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
      ) : (
        <Typography>Game not found</Typography>
      )}
    </>
  );
};

export default Poker;
