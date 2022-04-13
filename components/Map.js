import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

import { UberContext } from '../context/uberContext';

const style = {
	wrapper: 'flex-1 h-full w-full',
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
	const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext);
	const [map, setMap] = useState();

	const mapRef = useCallback(node => {
		if (node) {
			const map = new mapboxgl.Map({
				style: 'mapbox://styles/samfcmc/cl13yg5qh000014oa6r5rsfon',
				center: [-99.29011, 39.39172],
				zoom: 3,
				container: node,
			});

			setMap(map);
		}
	}, [])

	useEffect(() => {
		if (!map) return;

		const addToMap = (map, coordinates) => {
			const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
		}

		if (pickupCoordinates) {
			addToMap(map, pickupCoordinates);
		}
		if (dropoffCoordinates) {
			addToMap(map, dropoffCoordinates);
		}
	
		if (pickupCoordinates && dropoffCoordinates) {
			map.fitBounds([dropoffCoordinates, pickupCoordinates], {
        padding: 200,
      });
		}
	}, [dropoffCoordinates, map, pickupCoordinates]);

	return (
		<div className={style.wrapper} ref={mapRef}></div>
	)
}
