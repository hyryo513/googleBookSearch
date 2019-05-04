import React from "react";
import Header from "./components/Header";
import {Jumbotron, Container} from "react-bootstrap";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

function App() {
    return (
      <div>
        <Router>
          <Header />
          <Jumbotron className="text-center">
                <h1>Google Book Search</h1>
                <h2>Search for and Save Books of Interest</h2>
          </Jumbotron>
          <Container>
            <Route exact path="/search" component={Search} />
            <Route exact path="/saved" component={Saved} />
          </Container>
        </Router>
      </div>  
    )
}

export default App;
