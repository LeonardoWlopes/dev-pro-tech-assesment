import { WeatherIcon } from '~/components/weather-icon';
import type { CurrentWeatherProps } from './types';

export function CurrentWeather({ weather }: CurrentWeatherProps) {
	return (
		<div className="flex flex-col items-center gap-2 text-center">
			<WeatherIcon icon={weather?.weather[0]?.icon} size="lg" />

			<h1 className="text-center font-bold text-3xl text-white">
				{weather?.name}
			</h1>

			<p className="text-center font-bold text-7xl text-white">
				{Math.round(weather?.main?.temp)}°
			</p>

			<p className="text-white/90 capitalize">
				{weather?.weather[0]?.description}
			</p>
		</div>
	);
}
