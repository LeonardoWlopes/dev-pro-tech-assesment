import { WeatherIcon } from '~/components/weather-icon';
import { formatCityLabel } from '~/utils/city';
import type { CurrentWeatherProps } from './types';

export function CurrentWeather({ weather, displayCity }: CurrentWeatherProps) {
	const cityLabel = displayCity
		? formatCityLabel(displayCity)
		: weather?.sys?.country
			? `${weather.name} (${weather.sys.country})`
			: weather?.name;

	return (
		<div className="flex flex-col items-center gap-2 text-center">
			<WeatherIcon icon={weather?.weather[0]?.icon} size="lg" />

			<h1 className="text-center font-bold text-3xl text-white">{cityLabel}</h1>

			<p className="text-center font-bold text-7xl text-white">
				{Math.round(weather?.main?.temp)}°
			</p>

			<p className="text-white/90 capitalize">
				{weather?.weather[0]?.description}
			</p>
		</div>
	);
}
