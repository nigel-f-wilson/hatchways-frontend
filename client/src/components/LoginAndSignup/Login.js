import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { login } from "../../store/utils/thunkCreators";

const Login = (props) => {
  const { user, login } = props;
  
  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
    <ResponsiveLayout
      page="login"
      login={login}
    />
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
