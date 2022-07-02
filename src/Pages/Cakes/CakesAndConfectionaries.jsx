import React, { Component } from "react";
import Products from "../../Components/Products/Products";
import "./Cakes.css";

export default class CakesAndConfectionaries extends Component {
	constructor() {
		super();
		this.state = {
			cartItems: localStorage.getItem("cartItems")
				? JSON.parse(localStorage.getItem("cartItems"))
				: [],
		};
	}

	render() {
		return (
				<div>
					<div className="hero">
						<div className="banner">
							<h1 className="bannerTitle">
								Some of our Best Sellers
							</h1>
							<button className="bannerBtn">Shop Now </button>
						</div>
					</div>
					<Products addToCart={this.addToCart} />
				</div>
		);
	}
}
