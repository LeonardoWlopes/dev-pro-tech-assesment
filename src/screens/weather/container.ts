import { useCallback, useState } from 'react';
import { CITIES, WEATHER_BY_CITY } from '~/lib/mock-data';
import type { City } from '~/lib/mock-types';
import { useGetLocation, useReverseGeocode } from '~/services/location';
import { formatCityLabel } from '~/utils/city';

export function useWeatherScreenContainer() {
	const [searchValue, setSearchValue] = useState('');
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const { data: coordinates = null, isLoading: isLoadingCoordinates } =
		useGetLocation();

	const { data: reverseGeocode = null, isLoading: isLoadingReverseGeocode } =
		useReverseGeocode(coordinates);

	const weatherData = selectedCity ? WEATHER_BY_CITY[selectedCity.name] : null;

	const isLoading = isLoadingCoordinates || isLoadingReverseGeocode;

	const filteredCities =
		searchValue.trim().length < 1
			? []
			: CITIES.filter((city) => {
					const label = formatCityLabel(city).toLowerCase();
					const query = searchValue.toLowerCase();
					return label.includes(query);
				});

	function handleSearchChange(value: string) {
		setSearchValue(value);
	}

	const handleSelectCity = useCallback((city: City) => {
		setSelectedCity(city);
		setSearchValue(formatCityLabel(city));
	}, []);

	return {
		searchValue,
		onSearchChange: handleSearchChange,
		cities: filteredCities,
		selectedCity,
		onSelectCity: handleSelectCity,
		weatherData,
	};
}
