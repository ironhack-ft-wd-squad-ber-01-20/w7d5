import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CountryDetail extends React.Component {
  state = {
    country: null
  };

  getCountryData = () => {
    const cca3 = this.props.match.params.cca3;

    fetch(`http://a3bf3298.ngrok.io/countries/${cca3}`)
      .then(response => response.json())
      .then(data => {
        // const promises = data.borders.map(cca3 =>
        //   fetch(`http://a3bf3298.ngrok.io/countries/${cca3}`).then(response =>
        //     response.json()
        //   )
        // );

        const promises = [];
        for (const cca3 of data.borders) {
          promises.push(
            axios
              .get(`http://a3bf3298.ngrok.io/countries/${cca3}`)
              .then(response => response.data)
            // fetch(`http://a3bf3298.ngrok.io/countries/${cca3}`).then(response =>
            //   response.json()
            // )
          );
        }

        return Promise.all([data, ...promises]);
      })
      .then(results => {
        const country = results[0];
        const [, ...borders] = results;

        country.borders = borders;
        this.setState({
          country: country
        });
      });
  };

  componentDidUpdate(prevProps) {
    // console.log("prev: ", prevProps.match.params.cca3);
    // console.log("curr: ", this.props.match.params.cca3);
    if (prevProps !== this.props) {
      this.getCountryData();
    }
  }

  componentDidMount() {
    this.getCountryData();
  }

  render() {
    const country = this.state.country;

    return (
      <div className="col-7">
        <h1>{country?.name.common}</h1>
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              <td>{country?.capital[0]}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country?.area} km
                <sup>2</sup>
              </td>
            </tr>
            {country?.borders.length > 0 && (
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {country?.borders.map(country => {
                      return (
                        <li key={country.cca3}>
                          <Link to={`/${country.cca3}`}>
                            {country.name.common}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default CountryDetail;
