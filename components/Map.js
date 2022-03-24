import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const style = {
	wrapper: 'flex-1 h-full w-full',
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
	useEffect(() => {
		const map = new mapboxgl.Map({
			style: 'mapbox://styles/samfcmc/cl13yg5qh000014oa6r5rsfon',
			center: [-99.29011, 39.39172],
			zoom: 3,
			container: 'map'
		})
	}, []);

	return (
		<div className={style.wrapper} id="map"></div>
	)
}
