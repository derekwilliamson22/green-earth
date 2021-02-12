import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    farm_name: '',
    username: '',
    password: '',
    password_two: ''
  };

  registerUser = (event) => {
    event.preventDefault();
    if(this.state.password !== this.state.password_two){
      alert('Passwords must match');
    }
    else if(this.state.password === this.state.password_two){
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          farm_name: this.state.farm_name,
          username: this.state.username,
          password: this.state.password,
        },
      });
    };
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register Your New Green Earth Profile</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="farm_name">
            What is your farm name?
            <input
              type="text"
              name="farm_name"
              value={this.state.farm_name}
              required
              onChange={this.handleInputChangeFor('farm_name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Please choose a username
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Please choose a password
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password_two">
            Please reenter your password
            <input
              type="password"
              name="password_two"
              value={this.state.password_two}
              required
              onChange={this.handleInputChangeFor('password_two')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
