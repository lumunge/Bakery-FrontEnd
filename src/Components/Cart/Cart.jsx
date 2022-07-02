import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import {
	removeFromCart,
	addToCart,
	decreaseCart,
} from "../../Actions/cartActions";
import { createOrder, clearOrder } from "../../Actions/orderActions";
import formatCurrency from "../utils";
import "./Cart.css";
import "../../Pages/Contact/Contact.css";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			phone: "",
			address: "",
			mpesa: "",
			decoration: "",
			errors: {},
		};
	}
	handleValidation() {
		let name = this.state.name;
		let phone = this.state.phone;
		let email = this.state.email;
		let errors = {};
		let formIsValid = true;

		//Name
		if (!name) {
			formIsValid = false;
			errors["name"] = "please enter your name";
		}

		if (typeof name !== "undefined") {
			if (!name.match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["name"] = "only letters allowed";
			}
		}

		// //Phone Number
		if (!phone) {
			formIsValid = false;
			errors["phone"] = "please enter phone number";
		}
		if (typeof phone !== "undefined") {
			if (!phone.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)) {
				formIsValid = false;
				errors["phone"] = "please enter a valid phone number";
			}
		}

		//Email Address
		if (!email) {
			formIsValid = false;
			errors["email"] = "please enter your email address";
		}
		if (typeof email !== "undefined") {
			let lastAtPos = email.lastIndexOf("@");
			let lastDotPos = email.lastIndexOf(".");
			if (
				!(
					lastAtPos < lastDotPos &&
					lastAtPos > 0 &&
					email.indexOf("@@") === -1 &&
					lastDotPos > 2 &&
					email.length - lastDotPos > 2
				)
			) {
				formIsValid = false;
				errors["email"] = "please enter a valid email address";
			}
		}

		this.setState({ errors: errors });
		return formIsValid;
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	createOrder = (e) => {
		e.preventDefault();
		const order = {
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone,
			mpesa: this.state.mpesa,
			location: this.state.location,
			address: this.state.address,
			decoration: this.state.decoration,
			cartItems: this.props.cartItems,
			total: this.props.cartItems.reduce(
				(a, c) => a + c.price * c.count,
				0
			),
		};
		if (this.handleValidation()) {
			this.props.createOrder(order);
			this.setState({
				showCart: !this.state.showCart,
			});
		}
	};

	closeModal = () => {
		this.props.clearOrder();
		this.setState({
			showCheckout: false,
		});
	};

	showCheckout = () => {
		this.setState({
			showCheckout: true,
		});
	};

	toggleCart(e) {
		e.preventDefault();
		this.setState({
			showCart: !this.state.showCart,
		});
	}

	render() {
		const { cartItems, order } = this.props;
		const { showCart } = this.state;
		return (
			<div>
				<div className="cartBtn" onClick={(e) => this.toggleCart(e)}>
					<span className="navIcon">
						<i class="fas fa-cart-plus"></i>
					</span>
					<div className="cartLength">{cartItems.length}</div>
				</div>

				<div
					className={`cartOverlay ${showCart ? "transparentBg" : ""}`}
				>
					<div className={`cart ${showCart ? "showCart" : ""}`}>
						<div
							className="navIcon"
							onClick={(e) => this.toggleCart(e)}
						>
							<span className="closeCart">
								<i class="fas fa-window-close"></i>
							</span>
						</div>

						<div>
							{cartItems.length === 0 ? (
								<div className="money">Cart Is Empty</div>
							) : (
								<div className="money">
									You have {cartItems.length} Items
								</div>
							)}
						</div>

						{order && (
							<div className="orderModalContainer">
								<Modal
									isOpen={true}
									onRequestClose={this.closeModal}
									className="orderModal"
								>
									<Zoom>
										<button
											className="closeModal"
											onClick={this.closeModal}
										>
											x
										</button>
										<div className="orderDetails">
											<h3 className="orderSuccess">
												Your Order has been Placed
												Successfully
											</h3>
											<h2>Order {order._id}</h2>
											<ul>
												<li>
													<div>
														<span className="orderTitle">
															Name:
														</span>{" "}
														<span className="detail">
															{order.name}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Email:
														</span>{" "}
														<span className="detail">
															{order.email}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Phone:
														</span>{" "}
														<span className="detail">
															{order.phone}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Transaction Code:
														</span>{" "}
														<span className="detail">
															{order.mpesa}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Address:
														</span>{" "}
														<span className="detail">
															{order.address}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Cake Decoration:
														</span>{" "}
														<span className="detail">
															{order.decoration}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Date:
														</span>{" "}
														<span className="detail">
															{order.createdAt}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Totals:
														</span>{" "}
														<span className="detail">
															{order.total}
														</span>
													</div>
												</li>
												<li>
													<div>
														<span className="orderTitle">
															Items Ordered:
														</span>
													</div>
													<div>
														<span className="detail">
															{order.cartItems.map(
																(x) => (
																	<div>
																		{
																			x.count
																		}{" "}
																		{" x "}{" "}
																		{
																			x.title
																		}
																	</div>
																)
															)}
														</span>
													</div>
												</li>
											</ul>
										</div>
									</Zoom>
								</Modal>
							</div>
						)}

						<ul>
							{cartItems.map((item) => (
								<li key={item._id} className="cartItems">
									<div className="cart1">
										<div>
											<img
												src={item.image}
												alt={item.title}
											/>
										</div>
										<div>
											<button
												className="button remove"
												onClick={() =>
													this.props.removeFromCart(
														item
													)
												}
											>
												X
											</button>
										</div>
									</div>

									<div className="cart2">
										<div className="itemTitle">
											{item.title}
										</div>
									</div>

									<div className="cart3">
										<div className="money">
											<div>
												{formatCurrency(item.price)}{" "}
												<span className="multiply">
													x
												</span>{" "}
											</div>
										</div>
										<div className="counter">
											<a
												href="#!"
												data-id={item._id}
												onClick={() =>
													this.props.addToCart(item)
												}
											>
												<i class="fas fa-chevron-up"></i>
											</a>
											<p class="">{item.count} kgs</p>
											<a
												href="#!"
												data-id={item._id}
												onClick={() =>
													this.props.decreaseCart(
														item
													)
												}
											>
												<i class="fas fa-chevron-down"></i>
											</a>
										</div>
									</div>
									<hr />
								</li>
							))}
						</ul>
						{cartItems.length !== 0 && (
							<div className="cartFooter">
								<div className="money">
									Totals:{" "}
									{formatCurrency(
										cartItems.reduce(
											(a, c) => a + c.price * c.count,
											0
										)
									)}
								</div>
								<button
									className="button primary"
									onClick={this.showCheckout}
								>
									Proceed
								</button>
							</div>
						)}
						{this.state.showCheckout && (
							<Fade right cascade>
								<div className="checkOutForm">
									<h4>Create an order below</h4>
									<form onSubmit={this.createOrder}>
										<ul className="formContainer">
											<li>
												<span className="error">
													{this.state.errors["name"]}
												</span>
												<br />
												<input
													type="text"
													name="name"
													required
													placeholder="Your Name..."
													onChange={this.handleInput}
												/>
											</li>
											<li>
												<span className="error">
													{this.state.errors["email"]}
												</span>
												<br />
												<input
													type="email"
													name="email"
													required
													placeholder="Email Address..."
													onChange={this.handleInput}
												/>
											</li>
											<li>
												<span className="error">
													{this.state.errors["phone"]}
												</span>
												<br />
												<input
													type="tel"
													name="phone"
													required
													maxLength="10"
													placeholder="Phone Number..."
													onChange={this.handleInput}
												/>
											</li>
											<li>
												<select
													name="address"
													onChange={this.handleInput}
													required
												>
													<option value="">
														choose location
													</option>
													<option value="location1">
														location_1
													</option>
													<option value="location2">
														location_2
													</option>
													<option value="location3">
														location_3
													</option>
													<option value="location4">
														location_4
													</option>
													<option value="location5">
														location_5
													</option>
													<option value="location6">
														location_6
													</option>
												</select>
											</li>
											<li>
												<input
													type="text"
													name="mpesa"
													maxLength="10"
													required
													placeholder="Mpesa Transaction Code..."
													onChange={this.handleInput}
												/>
											</li>
											<li>
												<textarea
													rows="2"
													required
													name="decoration"
													placeholder="Cake Decoration Text or type 'None'...."
													maxLength="100"
													onChange={this.handleInput}
												></textarea>
											</li>
											<br />
											<li>
												<button
													type="submit"
													className="button primary"
												>
													CheckOut{" "}
													<i class="fas fa-arrow-right"></i>
												</button>
											</li>
										</ul>
									</form>
								</div>
							</Fade>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		order: state.order.order,
		cartItems: state.cart.cartItems,
	}),
	{ addToCart, decreaseCart, removeFromCart, createOrder, clearOrder }
)(Cart);
