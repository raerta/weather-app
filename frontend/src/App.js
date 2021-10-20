import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import FooterNav from "./components/FooterNav";
import Weather from "./components/Weather";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Weather} exact></Route>
          <Route path="/about" component={About} exact></Route>
        </Switch>
        <FooterNav />
      </div>
    </Router>
  );
}

export default App;
