import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../../img/slide1.jpg";
import slide2 from "../../img/slide2.jpg";
import slide3 from "../../img/slide3.jpg";
import "./Slider.css";

export default function Slider() {
	return (
		<div className="slider-wrapper">
			<Carousel
				showArrows={true}
				infiniteLoop
				autoPlay
				showThumbs={false}
				showStatus={false}
			>
				<div className="slider-img">
					<img src={slide1} alt="moist-img" />
					<p>Moist</p>
				</div>
				<div className="slider-img">
					<img src={slide2} alt="sweet-img" />
					<p>Sweet</p>
				</div>
				<div className="slider-img">
					<img src={slide3} alt="chocolatey-img" />
					<p>Chocolatey</p>
				</div>
			</Carousel>
		</div>
	);
}
