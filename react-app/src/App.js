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
import CategoriesPage from "./components/CategoriesPage";
import Footer from "./components/Footer";
import SearchResultsPage from "./components/SearchReultsPage";
import ScrollToTop from "./components/helpers";
import CollectionsPage from "./components/TrailCollectionsPage";
import CollectionDetailPage from "./components/CollectionDetailPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
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
          <Route exact path="/trails/search">
            <SearchResultsPage />
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
          <Route exact path="/categories/:categoryParam">
            <CategoriesPage />
          </Route>
          <Route exact path="/collections">
            <CollectionsPage />
          </Route>
          <Route exact path="/collections/:collectionId">
            <CollectionDetailPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
