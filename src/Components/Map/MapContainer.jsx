import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
	width: "100%",
};

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [
				{
					latitude: -1.2914240307691982,
					longitude: 36.890225184794694,
				},
			],
		};
	}

	displayMarker = () => {
		return this.state.stores.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.latitude,
						lng: store.longitude,
					}}
					onClick={() => console.log("I was clicked")}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<Map
					google={this.props.google}
					zoom={14}
					style={mapStyles}
					initialCenter={{
						lat: -1.2341900302415054,
						lng: 36.87199473955573,
					}}
				>
					{this.displayMarker()}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.GoogleApiKey,
})(MapContainer);
