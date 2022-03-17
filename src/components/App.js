import {Switch, Route , } from "react-router-dom";
import Main from "./Main";
import Movies from './Movies/Movies';
import '../index.css';
import Login from "./Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile.js";
import Error from "./Error/Error";


function App() {
  return (
              <Switch>
                <Route exact path="/">
                    <Main />
                </Route >
                  <Route path="/movies">
                    <Movies />
                  </Route>
                  <Route path="/sign-in">
                    <Login />
                  </Route>
                  <Route path='/saved'>
                     <Movies />
                  </Route>
                  <Route path='/sign-up'>
                      <Register />
                  </Route>
                  <Route path='/profile'>
                      <Profile />
                  </Route>
                  <Route path='/error'>
                      <Error />
                  </Route>
              </Switch>
  );

}


export default App;
