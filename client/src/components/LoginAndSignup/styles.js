import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  desktopRoot: {
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  desktopSidebar: {
    height: "100vh",
  },
  desktopFormArea: {
    height: "40vh",
    minHeight: "300px",
    minWidth: "380px",
    paddingRight: "5%"
  },
  topRight: {
    height: "60px",
    position: "absolute",
    top: "2rem",
    right: "3rem",
  },
  mobileRoot: {
    width: "100vw",
    minHeight: "850px",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    position: "relative",
  },
  mobileHeader: {
    width: "100vw",
    height: "100vh",
  },
  mobilePaper: {
    margin: "-20vh 0 3rem",
    width: "90%",
    maxWidth: "600px",
    padding: "1.5rem",
    height: "auto",
    minHeight: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export default useStyles