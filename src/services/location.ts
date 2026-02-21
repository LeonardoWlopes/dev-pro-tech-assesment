import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EQueryKeys } from '~/enums/location';
import type { ICoordinates, IGeolocationResult } from '~/interfaces/location';
import { getBrowserLocation, getLocationFromTimezone } from '~/utils/location';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'WeatherForecastApp/1.0 (https://github.com/dev-pro-tech)';

const nominatimClient = axios.create({
	baseURL: NOMINATIM_BASE,
	headers: {
		'User-Agent': USER_AGENT,
		Accept: 'application/json',
	},
});

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL_MS = 1100;

async function throttledGet<T>(url: string): Promise<T> {
	const now = Date.now();
	const elapsed = now - lastRequestTime;
	if (elapsed < MIN_REQUEST_INTERVAL_MS) {
		await new Promise((r) => setTimeout(r, MIN_REQUEST_INTERVAL_MS - elapsed));
	}
	lastRequestTime = Date.now();

	const { data } = await nominatimClient.get<T>(url);
	return data;
}

export function useGetLocation(): UseQueryResult<ICoordinates | null> {
	return useQuery({
		queryKey: [EQueryKeys.COORDINATES],
		queryFn: async () => {
			let coordinates: ICoordinates | null = null;

			try {
				coordinates = await getBrowserLocation();
			} catch {
				coordinates = getLocationFromTimezone();
			}

			sessionStorage.setItem(
				EQueryKeys.COORDINATES,
				JSON.stringify(coordinates),
			);
			return coordinates;
		},
		initialData: () => {
			const data = sessionStorage.getItem(EQueryKeys.COORDINATES);

			try {
				return data ? JSON.parse(data) : null;
			} catch {
				return null;
			}
		},
	});
}

export function useSearchByQuery(
	query: string,
	limit = 5,
): UseQueryResult<IGeolocationResult[]> {
	return useQuery({
		queryKey: [EQueryKeys.SEARCH, query],
		queryFn: async () => {
			if (!query.trim()) return [];

			const params = new URLSearchParams({
				q: query.trim(),
				format: 'json',
				addressdetails: '1',
				limit: String(limit),
			});

			return throttledGet<IGeolocationResult[]>(`/search?${params}`);
		},
		enabled: query.trim().length >= 2,
		staleTime: 2 * 60 * 1000, // 2 minutes
	});
}
