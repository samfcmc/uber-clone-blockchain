import { useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';

import { UberContext } from '../context/uberContext';

const style = {
	wrapper: 'flex-1 h-full w-full',
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
	const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext);

	useEffect(() => {
		const map = new mapboxgl.Map({
			style: 'mapbox://styles/samfcmc/cl13yg5qh000014oa6r5rsfon',
			center: [-99.29011, 39.39172],
			zoom: 3,
			container: 'map'
		});

		if (pickupCoordinates) {
			addToMap(map, pickupCoordinates);
		}
		if (dropoffCoordinates) {
			addToMap(map, dropoffCoordinates);
		}
	
		if (pickupCoordinates && dropoffCoordinates) {
			map.fitBounds([dropoffCoordinates, pickupCoordinates], {
				padding: 60,
			});
		}
	}, [dropoffCoordinates, pickupCoordinates]);

	const addToMap = (map, coordinates) => {
		const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
	}

	return (
		<div className={style.wrapper} id="map"></div>
	)
}
