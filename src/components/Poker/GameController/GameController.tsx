import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grow,
  IconButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { blue, green, orange, red } from "@material-ui/core/colors";
import RefreshIcon from "@material-ui/icons/Autorenew";
import ExitToApp from "@material-ui/icons/ExitToApp";
import LinkIcon from "@material-ui/icons/Link";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteOutlined from "@material-ui/icons/DeleteForeverTwoTone";
import Alert from "@material-ui/lab/Alert";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { finishGame, resetGame, removeGame } from "@/service";
import { Game, GameType } from "@/types";
import { isModerator } from "@/utils/isModerator";
import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import "./GameController.css";

interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({
  game,
  currentPlayerId,
}) => {
  const history = useHistory();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const { t } = useTranslation();
  const copyInviteLink = () => {
    const dummy = document.createElement("input");
    const url = `${window.location.origin}/join/${game.id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setShowCopiedMessage(true);
  };

  const leaveGame = () => {
    history.push(`/`);
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    window.location.href = "/";
  };

  const statusSession = useMemo(() => {
    switch (game.gameStatus) {
      case "In Progress":
        return t("game-controller.text-status-in-progress");
      case "Started":
        return t("game-controller.text-status-started");
      case "Finished":
        return t("game-controller.text-status-finished");
      default:
        return t("game-controller.text-status-not-started");
    }
  }, [game.gameStatus]);

  return (
    <Grow in={true} timeout={2000}>
      <div className="GameController">
        <Card variant="outlined" className="GameControllerCard">
          <CardHeader
            title={game.name}
            titleTypographyProps={{ variant: "h6" }}
            action={
              <div className="GameControllerCardHeaderAverageContainer">
                <Typography variant="subtitle1">{statusSession}</Typography>
                {game.gameType !== GameType.TShirt && (
                  <>
                    <Divider
                      className="GameControllerDivider"
                      orientation="vertical"
                      flexItem
                    />
                    <Typography variant="subtitle1">
                      {t("game-controller.text-average")}:
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="GameControllerCardHeaderAverageValue"
                    >
                      {game.average || 0}
                    </Typography>
                  </>
                )}
              </div>
            }
            className="GameControllerCardTitle"
          ></CardHeader>
          <CardContent className="GameControllerCardContentArea">
            {isModerator(
              game.createdById,
              currentPlayerId,
              game.isAllowMembersToManageSession
            ) && (
              <>
                <div className="GameControllerButtonContainer">
                  <div className="GameControllerButton">
                    <IconButton
                      onClick={() => finishGame(game.id)}
                      data-testid="reveal-button"
                      color="primary"
                    >
                      <VisibilityIcon
                        fontSize="large"
                        style={{ color: green[500] }}
                      />
                    </IconButton>
                  </div>
                  <Typography variant="caption">
                    {t("game-controller.button-reveal")}
                  </Typography>
                </div>

                <div className="GameControllerButtonContainer">
                  <div className="GameControllerButton">
                    <IconButton
                      data-testid="restart-button"
                      onClick={() => resetGame(game.id)}
                    >
                      <RefreshIcon fontSize="large" color="error" />
                    </IconButton>
                  </div>
                  <Typography variant="caption">
                    {t("game-controller.button-restart")}
                  </Typography>
                </div>

                <div className="GameControllerButtonContainer">
                  <div className="GameControllerButton">
                    <AlertDialog
                      title="Remove this session"
                      message={`Are you sure? This will delete this session and remove all players.`}
                      onConfirm={() => handleRemoveGame(game.id)}
                      data-testid="delete-button-dialog"
                    >
                      <IconButton>
                        <DeleteOutlined
                          fontSize="large"
                          style={{ color: red[300] }}
                        />
                      </IconButton>
                    </AlertDialog>
                  </div>
                  <Typography variant="caption">
                    {t("game-controller.button-delete")}
                  </Typography>
                </div>
              </>
            )}
            <div className="GameControllerButtonContainer">
              <div className="GameControllerButton">
                <IconButton
                  data-testid="exit-button"
                  onClick={() => leaveGame()}
                >
                  <ExitToApp fontSize="large" style={{ color: orange[500] }} />
                </IconButton>
              </div>
              <Typography variant="caption">
                {t("game-controller.button-exit")}
              </Typography>
            </div>
            <div
              title="Copy invite link"
              className="GameControllerButtonContainer"
            >
              <div className="GameControllerButton">
                <IconButton
                  data-testid="invite-button"
                  onClick={() => copyInviteLink()}
                >
                  <LinkIcon fontSize="large" style={{ color: blue[500] }} />
                </IconButton>
              </div>
              <Typography variant="caption">
                {t("game-controller.button-invite")}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          open={showCopiedMessage}
          autoHideDuration={5000}
          onClose={() => setShowCopiedMessage(false)}
        >
          <Alert severity="success">{t("game-controller.toast-invite")}</Alert>
        </Snackbar>
      </div>
    </Grow>
  );
};
