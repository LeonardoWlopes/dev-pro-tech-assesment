import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { EWeatherQueryKeys } from '~/enums/weather';
import type { ICoordinates } from '~/interfaces/location';
import type { IWeatherData, IWeatherForecast } from '~/interfaces/weather';
import { env } from '~/utils/env';

const OPENWEATHER_BASE = 'https://api.openweathermap.org';

function buildUrl(path: string, params: Record<string, string>): string {
	const search = new URLSearchParams({
		...params,
		appid: env.OPENWEATHER_API_KEY,
		units: 'metric',
	});
	return `${OPENWEATHER_BASE}${path}?${search}`;
}

export function useGetCurrentWeather(
	coordinates: ICoordinates | null = null,
): UseQueryResult<IWeatherData> {
	return useQuery({
		queryKey: [
			EWeatherQueryKeys.Current,
			coordinates?.lat ?? 0,
			coordinates?.lon ?? 0,
		],
		queryFn: async () => {
			const url = buildUrl('/data/2.5/weather', {
				lat: String(coordinates?.lat ?? 0),
				lon: String(coordinates?.lon ?? 0),
			});

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`OpenWeather API error: ${response.status}`);
			}

			const data = (await response.json()) as IWeatherData;

			return data;
		},
		enabled: !!coordinates?.lat && !!coordinates?.lon,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}

export function useGetForecast(
	coordinates: ICoordinates | null = null,
): UseQueryResult<IWeatherData[]> {
	return useQuery({
		queryKey: [
			EWeatherQueryKeys.Forecast,
			coordinates?.lat ?? 0,
			coordinates?.lon ?? 0,
		],
		queryFn: async () => {
			const url = buildUrl('/data/2.5/forecast', {
				lat: String(coordinates?.lat),
				lon: String(coordinates?.lon),
				cnt: '40',
			});
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`OpenWeather API error: ${response.status}`);
			}
			const data = (await response.json()) as IWeatherForecast;

			return data.list;
		},
		enabled: coordinates?.lat != null && coordinates?.lon != null,
		staleTime: 10 * 60 * 1000,
	});
}
