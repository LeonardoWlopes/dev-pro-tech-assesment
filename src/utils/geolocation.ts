import type { City, IGeolocationResult } from '~/interfaces/location';

export function geolocationResultToCity(result: IGeolocationResult): City {
	const { address, display_name } = result;
	const name =
		address?.city ??
		address?.town ??
		address?.village ??
		address?.municipality ??
		display_name.split(',')[0]?.trim() ??
		display_name;
	const state = address?.state ?? null;
	const country =
		address?.country_code?.toUpperCase() ?? address?.country ?? '';

	return {
		name,
		state,
		country,
		lat: Number.parseFloat(result.lat),
		lon: Number.parseFloat(result.lon),
	};
}
