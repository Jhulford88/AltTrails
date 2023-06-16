import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CreateTrailFormPage from "./components/CreateTrailFormPage";
import TrailDetailPage from "./components/TrailDetailPage";
import UpdateTrailFormPage from "./components/UpdateTrailFormPage";
import MyTrailsPage from "./components/myTrailsPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/trails/new">
            <CreateTrailFormPage />
          </Route>
          <Route exact path="/trails/:trailId">
          <TrailDetailPage />
          </Route>
          <Route exact path="/trails/:trailId/update">
            <UpdateTrailFormPage />
          </Route>
          <Route exact path="/current">
            <MyTrailsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
