import React, { Component } from "react";
import fomartCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../../Actions/productActions";
import { addToCart } from "../../Actions/cartActions";
import "./Products.css";

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
		};
	}

	componentDidMount() {
		this.props.fetchProducts();
	}

	openModal = (product) => {
		this.setState({
			product,
		});
	};

	closeModal = () => {
		this.setState({
			product: null,
		});
	};

	render() {
		const { product } = this.state;

		return (
			<div>
				<div className="products">
					<h2>Some Delicacies</h2>
					{!this.props.products ? (
						<div> Some Of Our Best Sellers... </div>
					) : (
						<div className="production">
							{this.props.products.map((product) => (
								<Fade bottom cascade>
									<article key={product._id} class="product">
										<div className="imgContainer">
											<span
												onClick={() =>
													this.openModal(product)
												}
												className="productBtn"
											>
												<img
													src={product.image}
													alt="product_image"
													class="productImg"
												/>
											</span>
											<button
												className="bagBtn"
												data-id={product.id}
												onClick={() =>
													this.props.addToCart(
														product
													)
												}
											>
												<i class="fas fa-shopping-cart"></i>
												Add to Cart
											</button>
										</div>
										<h3 className="title">
											{product.title}
										</h3>
										<h3 className="price">
											{fomartCurrency(product.price)}
										</h3>
										<button
											className="bagButton"
											data-id={product.id}
											onClick={() =>
												this.props.addToCart(product)
											}
										>
											Add to Cart
										</button>
									</article>
								</Fade>
							))}
						</div>
					)}
					{product && (
						<Modal
							isOpen={true}
							onRequestClose={this.closeModal}
							className="Modal"
						>
							<Zoom>
								<button
									className="closemodal"
									onClick={this.closeModal}
								>
									X
								</button>
								<div className="productDetails">
									<img
										src={product.image}
										alt={product.title}
									/>
									<div className="productDetailsDesc">
										<p>
											<strong>{product.title}</strong>
										</p>
										<p>{product.description}</p>
										<div className="productPrice">
											<div>
												{fomartCurrency(product.price)}
											</div>
										</div>
										<button
											className="modalbutton"
											onClick={() => {
												this.props.addToCart(product);
												this.closeModal();
											}}
										>
											Add to Cart
										</button>
									</div>
								</div>
							</Zoom>
						</Modal>
					)}
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({ products: state.products.filteredItems }),
	{
		fetchProducts,
		addToCart,
	}
)(Products);
