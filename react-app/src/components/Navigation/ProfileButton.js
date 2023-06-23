import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./profileButton.css";

function ProfileButton({ user }) {
  //Initialize things
  const dispatch = useDispatch();
  const ulRef = useRef();

  //State
  const [showMenu, setShowMenu] = useState(false);

  //useSelectors
  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  //Handle opening and closing menu
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="header-dropdown-button">
        {sessionUser ? (
          <i class="fa-regular fa-circle-user"></i>
        ) : (
          <div className="just-login">Login</div>
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.username}!</li>
            <hr className="bar" />
            <li>
              <NavLink className="category-link" exact to="/current">
                My Trails
              </NavLink>
            </li>
            <li>
              <button className="dropdown-logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Login"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <hr className="bar" />
            <p className="modal-text">New to AltTrails?</p>
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
