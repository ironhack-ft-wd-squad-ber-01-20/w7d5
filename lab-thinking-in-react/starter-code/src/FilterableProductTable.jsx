import React, { Component } from 'react';

const ProductRow = props => {
  return (
    <tr>
      <td style={{ color: props.product.stocked ? 'inherit' : 'red' }}>
        {props.product.name}
      </td>
      <td>{props.product.price}</td>
    </tr>
  );
};

const ProductTable = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map(product => {
          return <ProductRow key={product.id} product={product} />;
        })}
      </tbody>
    </table>
  );
};

const SearchBar = props => {
  return (
    <div>
      <input
        value={props.search}
        onChange={event => {
          props.updateSearchText(event.target.value);
        }}
      />
      <label>Only products in stock?</label>
      <input
        type="checkbox"
        checked={props.stocked}
        onChange={event => {
          props.updateChecked(event.target.checked);
        }}
      />
    </div>
  );
};

export default class FilterableProductTable extends Component {
  state = {
    search: '',
    stocked: true
  };

  updateSearchText = str => {
    this.setState({
      search: str
    });
  };

  updateChecked = bool => {
    this.setState({
      stocked: bool
    });
  };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.updateSearchText('ball');
  //   }, 2000);
  // }

  render() {
    const products = this.props.products.filter(product => {
      if (this.state.stocked) {
        return (
          product.name
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) && product.stocked
        );
      } else {
        return product.name
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      }
      // return (
      //   product.name.toLowerCase().includes(this.state.search.toLowerCase()) &&
      //   (this.state.stocked ? product.stocked : true)
      // );
    });

    console.log(products.length);

    return (
      <div>
        <h1>IronStore</h1>
        <SearchBar
          updateSearchText={this.updateSearchText}
          search={this.state.search}
          updateChecked={this.updateChecked}
          stocked={this.state.stocked}
        />
        <ProductTable products={products} />
      </div>
    );
  }
}
