import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useScreenWidth } from "../../hooks";

import { ResponsiveLayout } from "./Layouts";
import { login } from "../../store/utils/thunkCreators";

const Login = (props) => {
  const width = useScreenWidth()
  const { user, login } = props;
  
  if (user.id) {
    return <Redirect to="/home" />;
  }
  let layout = (width > 850) ? "desktop" : "mobile"
  
  return (
    <ResponsiveLayout
      layout={layout}
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
