import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useScreenWidth } from "../../hooks";

import { ResponsiveLayout } from "./Layouts";
import { register } from "../../store/utils/thunkCreators";

const Signup = (props) => {
  const width = useScreenWidth()
  const { user, register } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }
  let layout = (width > 850) ? "desktop" : "mobile"
  
  return (
    <ResponsiveLayout
      layout={layout}
      page="signup"
      register={register}
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
