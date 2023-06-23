import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../AltTrails.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  //useSelectors
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="main-nav-container">
      <ul className="navbar-ul">
        <div className="navbar-leftmost">
          <li>
            <NavLink exact to="/">
              <img className="logo" src={logo} alt="logo and home link"></img>
            </NavLink>
          </li>
          <li id="navbar-links-left">
            {sessionUser ? (
              <NavLink
                exact
                to="/trails/new"
                className="navbar-links-left"
                title="Create a New Trail!"
              >
                Create a Trail
              </NavLink>
            ) : null}
          </li>
          <li id="navbar-links-left">
            {sessionUser ? (
              <NavLink className="navbar-links-left" exact to="/current">
                My Trails
              </NavLink>
            ) : null}
          </li>
        </div>
        <div className="navbar-rightmost">
          {isLoaded && (
            <div>
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
