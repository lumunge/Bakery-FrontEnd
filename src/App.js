import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home";
import CakesAndConfectionaries from "./Pages/Cakes/CakesAndConfectionaries";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Auth from "./Pages/Auth/Auth";
import User from "./Pages/User/User";
import Menu from "./Components/Header/Menu";
import Footer from "./Components/Footer/Footer";
import Scroll from "./Components/Scroll";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<Provider store={store}>
					<BrowserRouter>
						<Scroll>
							<Menu />
							<Switch>
								<Route path="/" exact component={Home} />
								<Route
									path="/shop"
									exact
									component={CakesAndConfectionaries}
								/>
								<Route path="/about" exact component={About} />
								<Route
									path="/contact"
									exact
									component={Contact}
								/>
								<Route path="/auth" exact component={Auth} />
								<Route path="/user" exact component={User} />
							</Switch>
							<Footer />
						</Scroll>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}
