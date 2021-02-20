import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

const UserPage = ({store}) => {

  const {farm_name, username, id} = store.user
  // this component doesn't do much to start, just renders some user info to the DOM
  return (
    <div className="content">
      <h1 id="welcome">Welcome to {farm_name}, {username}!</h1>
      <p>Your User ID is: {id}</p>
      <LogOutButton className="log-in" />
    </div>
  );
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
