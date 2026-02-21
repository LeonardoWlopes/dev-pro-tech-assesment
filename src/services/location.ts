import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/enums/location';
import type { ICoordinates, IGeolocationResult } from '~/interfaces/location';
import { getBrowserLocation, getLocationFromTimezone } from '~/utils/location';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'WeatherForecastApp/1.0 (https://github.com/dev-pro-tech)';

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL_MS = 1100;

async function throttledFetch(url: string): Promise<Response> {
	const now = Date.now();
	const elapsed = now - lastRequestTime;
	if (elapsed < MIN_REQUEST_INTERVAL_MS) {
		await new Promise((r) => setTimeout(r, MIN_REQUEST_INTERVAL_MS - elapsed));
	}
	lastRequestTime = Date.now();

	const response = await fetch(url, {
		headers: {
			'User-Agent': USER_AGENT,
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Nominatim API error: ${response.status}`);
	}

	return response;
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

			const response = await throttledFetch(
				`${NOMINATIM_BASE}/search?${params}`,
			);
			const data = (await response.json()) as IGeolocationResult[];

			return data;
		},
		enabled: query.trim().length >= 2,
		staleTime: 2 * 60 * 1000, // 2 minutes
	});
}

export function useReverseGeocode(
	coordinates: ICoordinates | null = null,
): UseQueryResult<IGeolocationResult | null> {
	return useQuery({
		queryKey: [
			EQueryKeys.REVERSE_GEOCODE,
			coordinates?.lat ?? 0,
			coordinates?.lon ?? 0,
		],
		queryFn: async () => {
			const params = new URLSearchParams({
				lat: String(coordinates?.lat),
				lon: String(coordinates?.lon),
				format: 'json',
				addressdetails: '1',
				zoom: '10',
			});

			const response = await throttledFetch(
				`${NOMINATIM_BASE}/reverse?${params}`,
			);
			const data = (await response.json()) as IGeolocationResult;

			return data;
		},
		enabled: coordinates?.lat !== null && coordinates?.lon !== null,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
