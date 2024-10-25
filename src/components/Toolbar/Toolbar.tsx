import {
  Button,
  Slide,
  useMediaQuery,
  Typography,
  AppBar,
  Toolbar as AppToolbar,
} from "@material-ui/core";
import GamesIcon from "@material-ui/icons/Games";
import GithubIcon from "@material-ui/icons/GitHub";
import { LightModeIcon, DarkModeIcon } from "@/assets";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "@/context/ThemeProviderComponent";

import "./Toolbar.css";

export const title = "Planning Poker";

export const Toolbar = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("xs")
  );

  const { currentTheme, toggleTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <Slide direction="down" in={true} timeout={800}>
      <AppBar position="sticky" className="AppBar">
        <AppToolbar>
          <div className="HeaderContainer">
            <div
              className="HeaderLeftContainer"
              onClick={() => history.push("/")}
            >
              <GamesIcon className="HeaderIcon" />
              <Typography
                variant={isSmallScreen ? "subtitle1" : "h5"}
                color="inherit"
                noWrap
              >
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title={t("toolbar.button-new-session")}
                startIcon={<AddCircleOutlineIcon />}
                color="inherit"
                onClick={() => history.push("/")}
              >
                {!isSmallScreen ? t("toolbar.button-new-session") : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? "small" : "large"}
                color="inherit"
                onClick={() => history.push("/join")}
              >
                {!isSmallScreen ? t("toolbar.button-join-session") : null}
              </Button>
              <Button
                id="github-button"
                color="inherit"
                onClick={() =>
                  (window.location.href =
                    "https://github.com/IsraelOgas/planning-poker")
                }
              >
                <GithubIcon></GithubIcon>
              </Button>
              <Button variant="outlined" color="default" onClick={toggleTheme}>
                {currentTheme === "light" ? (
                  <LightModeIcon fill="black" width={25} />
                ) : (
                  <DarkModeIcon fill="white" width={25} />
                )}
              </Button>
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
