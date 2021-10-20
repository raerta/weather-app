import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Layout from "./components/Layout";
import Weather from "./components/Weather";

function App() {
  return (
    <Router>
     <Layout>
        <Switch>
          <Route path="/" component={Weather} exact></Route>
          <Route path="/about" component={About} exact></Route>
        </Switch>
        </Layout>
    </Router>
  );
}

export default App;
