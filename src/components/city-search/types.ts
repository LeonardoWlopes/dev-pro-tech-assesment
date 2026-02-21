import type { City } from '~/lib/mock-types';

export interface CitySearchProps {
	search: string;
	onSearchChange: (search: string) => void;
	cities: City[];
	selectedCity: City | null;
	onSelectCity: (city: City) => void;
}
