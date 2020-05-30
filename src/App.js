import React, {Suspense} from "react";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
//import ProfileContainer from "./components/Profile/ProfileContainer";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import UsersContainer from "./components/Users/UsersContainer";
import {Route, withRouter, BrowserRouter} from "react-router-dom";
import Login from "./components/Login/Login";
import {Provider, connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from './redux/redux-store';

const DialogsContainer = React.lazy( () => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy( () => import("./components/Profile/ProfileContainer"));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
       return <Preloader/>
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            //знак вопроса в конце userId говорит о том, что параметр не обязательный
            path="/profile/:userId?"
            render={ () => {
              return <Suspense fallback={<Preloader /> }>
                <ProfileContainer />
              </Suspense>
            } }
          />
          <Route
            path="/dialogs"
            render={ () => {
              return <Suspense fallback={<Preloader /> }>
                <DialogsContainer />
              </Suspense>
            } }
          />
          <Route
            path="/news"
            render={ () => <News /> }
          />
          <Route
            path="/music"
            render={ () => <Music /> }
          />
          <Route
            path="/settings"
            render={ () => <Settings /> }
          />
          <Route
            path="/friends"
            render={ () => <Friends /> }
          />
          <Route
            path="/users"
            render={ () => <UsersContainer /> }
          />
          <Route
            path="/login"
            render={ () => <Login /> }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    initialized: state.app.initialized
  })
}
const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}


const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);



export default SamuraiJSApp;
