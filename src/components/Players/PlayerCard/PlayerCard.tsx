import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Player, Status, GameType, Game } from "@/types";
import { getCards } from "../CardPicker/CardConfigs";
import "./PlayerCard.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { red } from "@material-ui/core/colors";
import { removePlayer } from "@/service";
import { isModerator } from "@/utils/isModerator";

interface PlayerCardProps {
  game: Game;
  player: Player;
  currentPlayerId: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  game,
  player,
  currentPlayerId,
}) => {
  const removeUser = (gameId: string, playerId: string) => {
    removePlayer(gameId, playerId);
  };

  return (
    <Card
      variant="outlined"
      className="PlayerCard"
      style={{
        backgroundColor: getCardColor(game, player.value),
      }}
    >
      <CardHeader
        className="PlayerCardTitle"
        title={player.name}
        titleTypographyProps={{
          variant: "subtitle2",
          noWrap: true,
          title: player.name,
        }}
        action={
          isModerator(
            game.createdById,
            currentPlayerId,
            game.isAllowMembersToManageSession
          ) &&
          player.id !== currentPlayerId && (
            <IconButton
              title="Remove"
              className="RemoveButton"
              onClick={() => removeUser(game.id, player.id)}
              data-testid="remove-button"
              color="primary"
            >
              <DeleteForeverIcon fontSize="small" style={{ color: red[300] }} />
            </IconButton>
          )
        }
      />
      <CardContent className="PlayerCardContent">
        <Typography variant="h2" className="PlayerCardContentMiddle">
          {getCardValue(player, game)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const getCardColor = (game: Game, value: number | undefined): string => {
  if (game.gameStatus !== Status.Finished) {
    return "var(--color-background-secondary)";
  }
  const card = getCards(game.gameType).find((card) => card.value === value);
  return card ? card.color : "var(--color-background-secondary)";
};

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Returns a string to display as the value of a PlayerCard.
 * If the game is not finished, displays a thumbs up emoji if the player has voted, or a thinking face emoji if they have not.
 * If the game is finished, displays the player's vote value as a string, or a coffee emoji if they voted -1.
 * If the player has not voted, displays a thinking face emoji.
 * @param player - The player to get the card value for.
 * @param game - The game that the player is in.
 * @returns A string to display as the value of the PlayerCard.
 */
/******  6144cc5d-a805-4899-978f-a86d54535c8a  *******/
const getCardValue = (player: Player, game: Game) => {
  if (game.gameStatus !== Status.Finished) {
    return player.status === Status.Finished ? "👍" : "🤔";
  }

  if (game.gameStatus === Status.Finished) {
    if (player.status === Status.Finished) {
      if (player.value && player.value === -1) {
        return player.emoji || "☕"; // coffee emoji
      }
      return getCardDisplayValue(game.gameType, player.value);
    }
    return "🤔";
  }
};

const getCardDisplayValue = (
  gameType: GameType | undefined,
  cardValue: number | undefined
): string | number | undefined => {
  return (
    getCards(gameType).find((card) => card.value === cardValue)?.displayValue ||
    cardValue
  );
};
