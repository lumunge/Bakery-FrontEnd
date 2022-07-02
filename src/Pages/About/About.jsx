import React, { Component } from "react";
import Modal from "react-modal";
import { Zoom, Fade, Bounce, Slide, Roll } from "react-reveal";
import { sendMail } from "../../Actions/maillistActions";
import { connect } from "react-redux";
import "./About.css";

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			error: "",
			showMessage: false,
		};
	} 

	closeModal = () => {
		this.setState({
			showMessage: false,
		});
	};

	handleValidation() {
		let email = this.state.email;
		let error = "";
		let formIsValid = true;

		//Email Address
		if (!email) {
			formIsValid = false;
			error = "please enter your email address";
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
				error = "please enter a valid email address";
			}
		}

		this.setState({ error: error });
		return formIsValid;
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	sendMail = (e) => {
		this.setState({ showMessage: false });
		e.preventDefault();
		const email = {
			email: this.state.email,
		};
		if (this.handleValidation()) {
			this.props.sendMail(email);
			this.setState({ email: "", showMessage: true });
		}
	};

	render() {
		return (
			<div>
				<div className="aboutLanding">
					<h2>A Little About Creme Cakes</h2>
				</div>

				<div className="aboutContent">
					<h1 className="motto">
						<i class="fas fa-quote-left"></i> clean, non-gmo,
						gluten-free and plant based ingredients
					</h1>

					<div className="mainAbout">
						<Zoom left>
							<div className="about about1">
								<Fade left cascade>
									<div className="gifCover">
										<div className="gif1"></div>
									</div>
								</Fade>
								<Fade right cascade>
									<div className="desc">
										<h1>Convenience</h1>
										<p>
											Lorem, ipsum dolor sit amet
											consectetur adipisicing elit. Error
											odio maxime beatae incidunt ipsam
											consectetur. Sapiente suscipit illo
											neque accusantium est, nesciunt
											ratione, vitae totam aut ullam culpa
											reiciendis quidem veniam quisquam
											saepe. Beatae natus commodi
											accusamus at neque magni?
										</p>
									</div>
								</Fade>
							</div>
						</Zoom>
						<Zoom right>
							<div className="about about2">
								<Fade left cascade>
									<div className="gifCover">
										<div className="gif2"></div>
									</div>
								</Fade>
								<Fade right cascade>
									<div className="desc">
										<h1>Taste</h1>
										<p>
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit.
											Deserunt nostrum magni alias aliquam
											recusandae laudantium eligendi
											suscipit similique, non nulla est,
											voluptas vel error sint, optio
											reprehenderit eveniet quaerat eius
											facere? Consequuntur officiis nemo
											eius, minima repellat molestiae
											dolorum nihil.
										</p>
									</div>
								</Fade>
							</div>
						</Zoom>
						<Zoom left>
							<div className="about about1">
								<Fade left cascade>
									<div className="gifCover">
										<div className="gif3"></div>
									</div>
								</Fade>
								<Fade right cascade>
									<div className="desc">
										<h1>Warmth</h1>
										<p>
											Lorem, ipsum dolor sit amet
											consectetur adipisicing elit. Aut,
											sed, amet non distinctio repudiandae
											laborum cum veritatis cumque
											quisquam, unde ipsum consequatur
											fugit perspiciatis ipsa! Cupiditate
											delectus non, aperiam tenetur, porro
											quos reiciendis accusamus maxime
											sint, consequatur perferendis et
											hic.
										</p>
									</div>
								</Fade>
							</div>
						</Zoom>
					</div>

					<div className="founder">
						<h1 class="aboutText">
							<Bounce left cascade>
								Get To know Our Founder{" "}
								<span>Bakery Owner</span>
							</Bounce>
						</h1>
						<div>
							<p>
								<Slide left cascade>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Soluta voluptatum
									assumenda consectetur iure veritatis
									similique maxime hic, eveniet ipsum
									perspiciatis doloremque tempora nam
									accusamus repellendus quam inventore
									pariatur. Sequi non animi asperiores ea
									numquam debitis ab voluptatibus cum porro!
									Necessitatibus tempora nostrum vel iusto
									tempore eius praesentium quos impedit a.
								</Slide>
							</p>
						</div>
						<div className="image">
							<Fade bottom>
								<div className="userImage"></div>
							</Fade>
						</div>
					</div>
					<div className="statistics">
						<div>
							<h4>Years Of Experience</h4>
							<p>
								<Roll left cascade>
									10
								</Roll>
							</p>
						</div>
						<div>
							<h4>Number of Satisfied Customers</h4>
							<p>
								<Roll right cascade>
									1700
								</Roll>
							</p>
						</div>
					</div>
					<div className="community">
						<h1>
							Join Our Community of Fellow Cake Lovers and Receive
							Free Recepies
						</h1>
						<form onSubmit={this.sendMail}>
							{this.state.showMessage && (
								<div>
									<Modal
										isOpen={true}
										onRequestClose={this.closeModal}
										className="Modal"
									>
										<Zoom>
											<p>
												Success!, <br /> Email Sent Successfully.
											</p>
										</Zoom>
									</Modal>
								</div>
							)}
							<div>
								<span style={{ color: "red" }}>
									{this.state.error}
								</span>
								<br />
								<input
									type="email"
									name="email"
									required
									placeholder="Email Address..."
									value={this.state.email}
									onChange={this.handleInput}
								/>
							</div>
							<br />
							<div>
								<button className="aboutButton" type="submit">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		email: state.email.email,
	}),
	{ sendMail }
)(About);
