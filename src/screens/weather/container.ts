import { useCallback, useMemo, useState } from 'react';
import { useDebouncedValue } from '~/hooks/use-debounced-value';
import type { City } from '~/interfaces/location';
import { useGetLocation, useSearchByQuery } from '~/services/location';
import { useGetCurrentWeather, useGetForecast } from '~/services/weather';
import { formatCityLabel } from '~/utils/city';
import { geolocationResultToCity } from '~/utils/geolocation';

const SEARCH_DEBOUNCE_MS = 300;

export function useWeatherScreenContainer() {
	const [searchValue, setSearchValue] = useState('');
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const debouncedSearch = useDebouncedValue(
		searchValue.trim(),
		SEARCH_DEBOUNCE_MS,
	);

	const { data: locationCoordinates = null, isLoading: isLoadingCoordinates } =
		useGetLocation();

	const { data: searchResults = [], isLoading: isLoadingSearch } =
		useSearchByQuery(debouncedSearch, 8);

	const coordinates = selectedCity
		? { lat: selectedCity.lat, lon: selectedCity.lon }
		: locationCoordinates;

	const { data: currentWeather = null, isLoading: isLoadingCurrentWeather } =
		useGetCurrentWeather(coordinates);

	const { data: forecastWeather = [], isLoading: isLoadingForecast } =
		useGetForecast(coordinates);

	const isLoading =
		isLoadingCoordinates || isLoadingCurrentWeather || isLoadingForecast;

	const cities = useMemo(
		() => searchResults.map(geolocationResultToCity),
		[searchResults],
	);

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
		cities,
		selectedCity,
		onSelectCity: handleSelectCity,
		isLoading,
		isSearching: isLoadingSearch,
		currentWeather,
		forecastWeather,
	};
}
