import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default class Footer extends Component {
	toTop() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<footer>
				<div className="footerMain">
					<div className="footerCol">
						<h2>Explore</h2>
						<Link to="/">Home</Link>
						<Link to="/shop">Shop</Link>
						<Link to="/contact">Contact</Link>
						<Link to="/about">About</Link>
						<Link to="/auth">SignIn</Link>
					</div>
					<div className="footerCol">
						<h2>On The Web</h2>
						<a
							href="https://www.instagram.com"
							rel="noreferrer"
							target="_blank"
						>
							Instagram
						</a>
						<a
							href="https://www.facebook.com"
							rel="noreferrer"
							target="_blank"
						>
							Facebook
						</a>
						<a
							href="https://www.youtube.com"
							rel="noreferrer"
							target="_blank"
						>
							Youtube
						</a>
					</div>
					<div className="footerCol">
						<h2>Legal</h2>
						<a href="#!">Privacy Policy</a>
						<a href="#!">Terms Of Use</a>
					</div>
					<div className="linkToTop">
						<span onClick={this.toTop}>
							<i
								class="fa fa-chevron-circle-up"
								aria-hidden="true"
							></i>
						</span>
					</div>
				</div>
				<div className="copy">
					<p>
						<a
							href="https://www.github.com/lumunge"
							rel="noreferrer"
							target="_blank"
						>
							lumunge
						</a>{" "}
						&copy; 2021 bakery shop
					</p>
				</div>
			</footer>
		);
	}
}
