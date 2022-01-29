import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { register } from "../../store/utils/thunkCreators";

const Signup = (props) => {
  const { user, register } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
    <ResponsiveLayout
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
