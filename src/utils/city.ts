import type { City } from '~/interfaces/location';

export function formatCityLabel(city: City): string {
	return `${city.name}${city.state ? `, ${city.state}` : ''} (${city.country})`;
}
