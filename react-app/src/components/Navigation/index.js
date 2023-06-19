import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../AltTrails.png"

function Navigation({ isLoaded }){

	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navbar-ul'>
			<li>
				<NavLink exact to="/"><img className='logo' src={logo} alt='logo and home link'></img></NavLink>
				{sessionUser ? <NavLink exact to="/trails/new" className="create-trail-link" title="Create a New Trail!">+</NavLink> : null}

			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
