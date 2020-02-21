import React, { Component, useState } from 'react';
import { data } from './data.json';
import './App.css';

import FilterableProductTable from './FilterableProductTable';
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterableProductTable products={data} />
      </div>
    );
  }
}
