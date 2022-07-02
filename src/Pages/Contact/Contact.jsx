import React, { Component } from "react";
import Modal from "react-modal";
import { Zoom } from "react-reveal";
import MapContainer from "../../Components/Map/MapContainer";
import { createContact } from "../../Actions/contactActions";
import { connect } from "react-redux";
import "./Contact.css";

class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contactData: {},
			empty: "",
			errors: {},
			showMessage: false,
		};
	}

	closeModal = () => {
		this.setState({
			showMessage: false,
		});
	};

	handleInput = (contact, e) => {
		let contactData = this.state.contactData;
		contactData[contact] = e.target.value;
		this.setState({
			contactData,
		});
	};

	handleValidation() {
		let contactData = this.state.contactData;
		let errors = {};
		let formIsValid = true;

		//Name
		if (!contactData["name"]) {
			formIsValid = false;
			errors["name"] = "please enter your name";
		}

		if (typeof contactData["name"] !== "undefined") {
			if (!contactData["name"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["name"] = "only letters allowed";
			}
		}

		//Phone Number
		if (!contactData["phone"]) {
			formIsValid = false;
			errors["phone"] = "please enter phone number";
		}

		if (typeof contactData["phone"] !== "undefined") {
			if (
				!contactData["phone"].match(
					/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
				)
			) {
				formIsValid = false;
				errors["phone"] = "please enter a valid phone number";
			}
		}

		//Email Address
		if (!contactData["email"]) {
			formIsValid = false;
			errors["email"] = "please enter your email address";
		}
		if (typeof contactData["email"] !== "undefined") {
			let lastAtPos = contactData["email"].lastIndexOf("@");
			let lastDotPos = contactData["email"].lastIndexOf(".");
			if (
				!(
					lastAtPos < lastDotPos &&
					lastAtPos > 0 &&
					contactData["email"].indexOf("@@") === -1 &&
					lastDotPos > 2 &&
					contactData["email"].length - lastDotPos > 2
				)
			) {
				formIsValid = false;
				errors["email"] = "please enter a valid email address";
			}
		}

		this.setState({ errors: errors });
		return formIsValid;
	}

	createContact = (e) => {
		e.preventDefault();
		let contactData = this.state.contactData;
		if (this.handleValidation()) {
			this.props.createContact(contactData);
			this.setState({ showMessage: true });
			contactData["name"] = "";
			contactData["phone"] = "";
			contactData["email"] = "";
			contactData["message"] = "";
		}
	};

	render() {
		return (
			<div>
				<div className="mainContact">
					<div className="landing">
						<div className="landingContent">
							<h3>Hey There, Get in touch with us ASAP!</h3>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book. .
							</p>
						</div>
					</div>
					<div className="contactContainer">
						<div className="form">
							<form onSubmit={this.createContact}>
								{this.state.showMessage && (
									<div>
										<Modal
											isOpen={true}
											onRequestClose={this.closeModal}
											className="Modal"
										>
											<Zoom>
												<p>
													Success!, <br /> Data Sent
													Successfully.
												</p>
											</Zoom>
										</Modal>
									</div>
								)}
								<h1>Send Us A Message</h1>
								<div>
									<span style={{ color: "red" }}>
										{this.state.errors["name"]}
									</span>
									<br />
									<input
										type="text"
										required
										placeholder="Your Name..."
										name="name"
										value={this.state.contactData["name"]}
										onChange={this.handleInput.bind(
											this,
											"name"
										)}
									/>
								</div>
								<div>
									<span style={{ color: "red" }}>
										{this.state.errors["phone"]}
									</span>
									<br />
									<input
										type="tel"
										required
										placeholder="Phone Number..."
										name="phone"
										maxLength="10"
										value={this.state.contactData["phone"]}
										onChange={this.handleInput.bind(
											this,
											"phone"
										)}
									/>
								</div>
								<div>
									<span style={{ color: "red" }}>
										{this.state.errors["email"]}
									</span>
									<br />
									<input
										type="email"
										required
										placeholder="Email Address..."
										name="email"
										value={this.state.contactData["email"]}
										onChange={this.handleInput.bind(
											this,
											"email"
										)}
									/>
								</div>
								<div>
									<textarea
										rows="5"
										cols="28"
										required
										placeholder="You message here.."
										name="message"
										value={
											this.state.contactData["message"]
										}
										onChange={this.handleInput.bind(
											this,
											"message"
										)}
									></textarea>
								</div>
								<div>
									<button
										type="submit"
										className="submitContact"
									>
										<i class="fas fa-paper-plane"></i>
									</button>
								</div>
							</form>
						</div>
						<div className="contactInfo">
							<div className="details">
								<h1>More Information</h1>
								<p>
									<i class="fas fa-search-location"></i>{" "}
									Location near location 23489 Kr Road
								</p>
								<p>
									<i class="fas fa-phone"></i> +123 678 8829
								</p>
								<p>
									<i class="fas fa-envelope-open-text"></i>{" "}
									cakes@yahoo.com{" "}
								</p>
							</div>
							<div className="social">
								<a
									href="https://www.facebook.com"
									target="_blank"
									rel="noreferrer"
								>
									<i class="fab fa-facebook-square"></i>
								</a>
								<a
									href="https://www.instagram.com"
									target="_blank"
									rel="noreferrer"
								>
									<i class="fab fa-instagram"></i>
								</a>
							</div>
						</div>
					</div>

					<div className="mapContainer">
						<div className="header">
							<h1>Find Our Stores</h1>
							<hr />
						</div>
						<MapContainer />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		contact: state.contact.contact,
	}),
	{ createContact }
)(Contact);
