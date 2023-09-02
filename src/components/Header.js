import React, { useContext } from "react";
import dig from "object-dig"
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-between'
  },
  button: {
    color: '#fff'
  }
}));


const Header = () => {

  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  
  //もしログインしていたら
  const buttonRender = () => {
    let buttonDom
    if(dig(currentUser, 'currentUser' , 'uid')) {
    //if( currentUser.currentUser ) {
    //object dig使わなかったら↑は中身が存在しません！というエラーになってしまう
    //currentUserの構造：　currentUser.currentUser.Im.〇〇
      buttonDom = <Button className={classes.button} valiant="inherit" onClick={logOut}>ログアウト</Button>
    } else {
    //もしログインしていなかったら
      buttonDom = <Button className={classes.button} valiant="inherit" onClick={signInWithGoogle}>ログイン</Button>
    }
    return buttonDom
  }

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          ReactToDo
        </Typography>
          {/* {buttonRender()} */}
      </Toolbar>
    </AppBar>
  )
}

export default Header;