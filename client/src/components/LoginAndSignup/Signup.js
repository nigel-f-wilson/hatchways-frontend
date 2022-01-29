import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useScreenWidth } from "../../hooks";

import { DesktopLayout, MobileLayout } from "./Layouts";
import { register } from "../../store/utils/thunkCreators";

const Signup = (props) => {
  const width = useScreenWidth()
  const { user, register } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  if (width > 850) {
    return <DesktopLayout 
      page="signup"
      register={register}
    />
  } else {
    return <MobileLayout 
      page="signup"
      register={register}
    />
  }
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
