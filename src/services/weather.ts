import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EWeatherQueryKeys } from '~/enums/keys';
import type { ICoordinates } from '~/interfaces/location';
import type { IWeatherData, IWeatherForecast } from '~/interfaces/weather';
import { env } from '~/utils/env';

const openWeatherClient = axios.create({
	baseURL: 'https://api.openweathermap.org',
	params: {
		appid: env.OPENWEATHER_API_KEY,
		units: 'metric',
	},
});

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
			const { data } = await openWeatherClient.get<IWeatherData>(
				'/data/2.5/weather',
				{
					params: {
						lat: coordinates?.lat ?? 0,
						lon: coordinates?.lon ?? 0,
					},
				},
			);
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
			const { data } = await openWeatherClient.get<IWeatherForecast>(
				'/data/2.5/forecast',
				{
					params: {
						lat: coordinates?.lat,
						lon: coordinates?.lon,
						cnt: '40',
					},
				},
			);
			return data.list;
		},
		enabled: coordinates?.lat != null && coordinates?.lon != null,
		staleTime: 10 * 60 * 1000,
	});
}
