import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./styles/css/App.css";
import Legal from "./routes/Legal/Legal";
import Muggl from "./routes/Muggl";
import Post from "./routes/Post";
import PostDetail from "./routes/PostDetail";
import User from "./routes/User";

function App() {

  return (
      <BrowserRouter>
          <Route path="/" exact={true} component={Muggl}/>
          <Switch>
              <Route path="/legal" component={Legal}/>
              <Route path="/legal:doc" component={Legal}/>
              <Route path="/post" component={Post}/>
              <Route path="/post:id" component={PostDetail}/>
              <Route path="/:uid" component={User}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
