import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import CountryDetail from "./CountryDetail";

class App extends React.Component {
  state = {
    countries: []
  };

  componentDidMount() {
    // fetch("http://a3bf3298.ngrok.io/countries")
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({
    //       countries: data
    //     });
    //   });

    axios.get("http://a3bf3298.ngrok.io/countries").then(response => {
      this.setState({
        countries: response.data
      });
    });
  }

  render() {
    // console.log("RENDER: ", this.state.countries.length);

    return (
      <div>
        <nav className="navbar navbar-dark bg-primary mb-3">
          <div className="container">
            <a className="navbar-brand" href="/">
              WikiCountries
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div
              className="col-5"
              style={{
                maxHeight: "90vh",
                overflow: "scroll"
              }}
            >
              <div className="list-group">
                {this.state.countries.map(country => {
                  return (
                    <NavLink
                      // activeClassName="my-active-class"
                      key={country.cca3}
                      className="list-group-item list-group-item-action"
                      to={`/${country.cca3}`}
                    >
                      {country.flag} {country.name.common}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <Route path="/:cca3" component={CountryDetail} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
