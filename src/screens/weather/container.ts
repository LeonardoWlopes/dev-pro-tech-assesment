import { useCallback, useState } from 'react';

import { useGetLocation, useReverseGeocode } from '~/services/location';
import { useGetCurrentWeather, useGetForecast } from '~/services/weather';
import { formatCityLabel } from '~/utils/city';

export function useWeatherScreenContainer() {
	const [searchValue, setSearchValue] = useState('');
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const { data: coordinates = null, isLoading: isLoadingCoordinates } =
		useGetLocation();

	const { data: reverseGeocode = null, isLoading: isLoadingReverseGeocode } =
		useReverseGeocode(null);

	const { data: currentWeather = null, isLoading: isLoadingCurrentWeather } =
		useGetCurrentWeather(coordinates);

	const { data: forecastWeather = [], isLoading: isLoadingForecast } =
		useGetForecast(coordinates);

	const isLoading =
		isLoadingCoordinates ||
		isLoadingReverseGeocode ||
		isLoadingCurrentWeather ||
		isLoadingForecast;

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
		isLoading,
		currentWeather,
		forecastWeather,
	};
}
