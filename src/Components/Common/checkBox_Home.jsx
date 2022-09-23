import React, { Component } from "react";
import Checkbox from "./Checkbox";
import ProductList from "./ProductsList";
import { productsList } from "./data.json";
import "./styles.css";

export default class App extends Component {
  state = {
    products: productsList,
    categories: {
      first: false,
      second: false,
    },
  };

  handleChange = (e) => {
    const { name } = e.target;

    this.setState((prevState) => {
      return {
        categories: {
          ...prevState.categories,
          [name]: !prevState.categories[name],
        },
      };
    });
  };

  render() {
    const checkedProducts = Object.entries(this.state.categories)
      .filter((category) => category[1])
      .map((category) => category[0]);
    const filteredProducts = this.state.products.filter(({ category }) =>
      checkedProducts.includes(category)
    );

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Checkbox
          id="1"
          title="show first category products"
          name="first"
          checked={this.state.categories.first}
          handleChange={this.handleChange}
        />
        <Checkbox
          id="2"
          title="show second categor productsy"
          name="second"
          handleChange={this.handleChange}
          checked={this.state.categories.second}
        />
        <ProductList
          products={
            filteredProducts.length === 0
              ? this.state.products
              : filteredProducts
          }
        />
      </div>
    );
  }
}
