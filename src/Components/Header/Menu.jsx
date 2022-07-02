import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuLinks } from "./MenuLinks";
import Cart from "../../Components/Cart/Cart";
import "./Menu.css";

export default class Menu extends Component {
	constructor() {
		super();
		this.state = {
			clicked: false,
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = () => {
		if (window.scrollY > 20) {
			document.querySelector(".navbar").className = "navbar scroll";
		} else {
			document.querySelector(".navbar").className = "navbar";
		}
	};

	showMenu = () => {
		this.setState({
			clicked: !this.state.clicked,
		});
	};

	render() {
		return (
			<>
				<div className="topNav">
					<div className="socialIcons">
						<a
							href="https://www.facebook.com"
							rel="noreferrer"
							target="_blank"
						>
							<i class="fab fa-facebook-square"></i>
						</a>
						<a
							href="https://www.instagram.com"
							rel="noreferrer"
							target="_blank"
						>
							<i class="fab fa-instagram-square"></i>
						</a>
						<a href="https://www.youtube.com">
							<i class="fab fa-youtube-square"></i>
						</a>
					</div>
				</div>

				<header className="navbar">
					<div className="branding">
						<Link to="/">
							<img
								className="logo"
								src="https://img.freepik.com/free-vector/happy-birthday-cake-design-vector_53876-61836.jpg?size=338&ext=jpg"
								alt=""
							/>
						</Link>
					</div>
					<div
						className={
							this.state.clicked ? "menuBtn close" : "menuBtn"
						}
						onClick={this.showMenu}
					>
						<div className="btnLine"></div>
						<div className="btnLine"></div>
						<div className="btnLine"></div>
					</div>

					<div className={this.state.clicked ? "menu show" : "menu"}>
						<ul
							className={
								this.state.clicked ? "menuNav show" : "menuNav"
							}
						>
							{MenuLinks.map((item, index) => {
								return (
									<li
										key={index}
										className={
											this.state.clicked
												? "navItem show"
												: "navItem"
										}
										onClick={this.showMenu}
									>
										<Link
											to={item.path}
											className={item.cName}
										>
											{item.title}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>

					<div
						className={
							this.state.clicked ? "showloginCart" : "loginCart"
						}
					>
						<Cart
							decreaseCart={this.decreaseCart}
							cartItems={this.state.cartItems}
						/>
					</div>
				</header>
			</>
		);
	}
}
