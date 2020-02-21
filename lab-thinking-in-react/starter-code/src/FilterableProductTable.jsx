import React, { Component } from 'react';

const ProductRow = props => {
  return (
    <tr>
      <td>{props.product.name}</td>
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
  console.log(props.search);
  return (
    <div>
      <input
        value={props.search}
        onChange={event => {
          props.updateSearchText(event.target.value);
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

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.updateSearchText('ball');
  //   }, 2000);
  // }

  render() {
    const products = this.props.products.filter(product =>
      product.name.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        <h1>IronStore</h1>
        <SearchBar
          updateSearchText={this.updateSearchText}
          search={this.state.search}
        />
        <ProductTable products={products} />
      </div>
    );
  }
}
