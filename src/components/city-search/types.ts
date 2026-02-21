import type { City } from '~/interfaces/location';

export interface CitySearchProps {
	search: string;
	onSearchChange: (search: string) => void;
	cities: City[];
	selectedCity: City | null;
	onSelectCity: (city: City) => void;
	isSearching?: boolean;
}
