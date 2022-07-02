import { useState } from "react";
import Modal from "react-modal";
import { Zoom } from "react-reveal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../../Actions/authActions";
import "./Auth.css";

const initialState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	// const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const [message, setMessage] = useState(false);
	// const [error, setError] = useState(null);

	// const error = useSelector(();

	const dispatch = useDispatch();
	const history = useHistory();

	// const handleShowPassword = () => {
	// 	setShowPassword(!showPassword);
	// };

	const closeModal = () => {
		setMessage(message);
	};

	const switchForm = (e) => {
		e.preventDefault();
		setIsSignUp(!isSignUp);
		// setShowPassword(false);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signUp(formData, history));
			setMessage(!message);
		} else {
			dispatch(signIn(formData, history));
			message(!message);
		}
	};

	return (
		<div className="main">
			<div>
				<form className="form" onSubmit={handleSubmit}>
					{message && (
						<div>
							<Modal
								isOpen={true}
								onRequestClose={closeModal}
								className="Modal"
							>
								<Zoom>
									<p className="flashMessage">
										Redirecting...
									</p>
								</Zoom>
							</Modal>
						</div>
					)}
					<span className="user-icon">
						<i class="fa fa-user" aria-hidden="true"></i>
					</span>
					<div className="form-input">
						{isSignUp && (
							<input
								className="input"
								type="text"
								name="username"
								onChange={handleChange}
								autoFocus
								placeholder="User-Name"
							/>
						)}
						<input
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="Email Address"
						/>
						<input
							type="password"
							name="password"
							onChange={handleChange}
							placeholder="Password"
						/>
						{isSignUp && (
							<input
								type="password"
								name="confirmPassword"
								onChange={handleChange}
								placeholder="Confirm Password"
							/>
						)}
					</div>

					<button className="signBtn" type="submit">
						{isSignUp ? "SignUp" : "SignIn"}
					</button>
					<div>
						<button className="accountBtn" onClick={switchForm}>
							{isSignUp
								? "Have an Account? Sign In"
								: "Dont Have An Account? Sign Up"}
						</button>
					</div>
					<p>
						<a
							href="https://www.github.com/lumunge"
							target="_blank"
							rel="noreferrer"
						>
							{" "}
							lumunge
						</a>{" "}
						© 2021 bakery shop
					</p>
				</form>
			</div>
		</div>
	);
};

export default Auth;
