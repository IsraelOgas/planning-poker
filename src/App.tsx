import { CssBaseline } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { GamePage } from "./pages/GamePage/GamePage";
import HomePage from "./pages/HomePage/HomePage";
import JoinPage from "./pages/JoinPage/JoinPage";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Loading from "./components/Loading/Loading";
import { ThemeProviderComponent } from "./context/ThemeProviderComponent";

function MainComponent() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProviderComponent>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Router>
            <Toolbar />
            <Switch>
              <Route path="/game/:id" component={GamePage} />
              <Route path="/join/:id" component={JoinPage} />
              <Route exact path="/*" component={HomePage} />
            </Switch>
          </Router>
        </StylesProvider>
      </ThemeProviderComponent>
    </I18nextProvider>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MainComponent />
    </Suspense>
  );
}

export default App;
