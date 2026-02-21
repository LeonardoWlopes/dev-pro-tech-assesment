import type { ICoordinates } from '~/interfaces/location';
import { TIMEZONE_TO_COORDS } from './mock';

export function getBrowserLocation(): Promise<ICoordinates> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('Geolocation is not supported by this browser'));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			},
			(error) => {
				reject({ code: error.code, message: error.message });
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000,
			},
		);
	});
}

export function getLocationFromTimezone(): ICoordinates | null {
	try {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const coords = TIMEZONE_TO_COORDS[timeZone];
		if (coords) return coords;

		const region = timeZone.split('/')[0];
		const regionalMatch = Object.keys(TIMEZONE_TO_COORDS).find((tz) =>
			tz.startsWith(region),
		);

		if (regionalMatch) return TIMEZONE_TO_COORDS[regionalMatch];
	} catch {
		// Intl may not be fully supported
	}

	return null;
}
