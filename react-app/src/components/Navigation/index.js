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
				<NavLink exact to="/trails/new">Create a new Trail</NavLink>
				<NavLink exact to="/current">My Trails</NavLink>
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
