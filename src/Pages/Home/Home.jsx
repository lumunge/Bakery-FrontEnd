import React from "react";
import {Link} from 'react-router-dom';
import Slider from "../../Components/Slider/Slider";
import "./Home.css";

export default function Home() {
	return (
		<div>
			<Slider />
			<div className="home">
				<h1 className="heading">
					Bakery <span>Cakes, Confectionaries and Pastries</span>
				</h1>
				<h2>A good CTA Here</h2>
				<Link to="/shop" className="button">
					Shop Now
				</Link>
			</div>
		</div>
	);
}
