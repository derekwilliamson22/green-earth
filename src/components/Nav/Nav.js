import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <img src="images/green-earth-logo-navbar.png" alt="" className="nav-img"/>
      <Link className="nav-link" to={loginLinkData.path}>
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {loginLinkData.text}
      </Link>
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.store.user.id && (
        <>
          <Link className="nav-link" to="/info">
            Seasons
          </Link>
          <Link className="nav-link" to="/crops">
            Crops
          </Link>
          <Link className="nav-link" to="/info">
            Profile
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
