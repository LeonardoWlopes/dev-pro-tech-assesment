import { useTranslation } from 'react-i18next';
import { aggregateForecastByDay } from '~/utils/forecast';
import { WeatherIcon } from '../weather-icon';
import type { FiveDayForecastProps } from './types';

export function FiveDayForecast({ forecast }: FiveDayForecastProps) {
	const { t } = useTranslation('forecast');

	const days = aggregateForecastByDay(forecast);

	if (days.length === 0) return null;

	return (
		<div className="flex flex-wrap justify-center gap-4">
			{days.map((day, index) => (
				<div
					key={`${day.day}-${index}`}
					className="flex min-w-[110px] flex-col items-center gap-2 rounded-xl bg-white/15 px-4 py-4 backdrop-blur-sm"
				>
					<span className="font-medium text-white">{day.day}</span>

					<WeatherIcon icon={day.icon} size="sm" />

					<div className="flex gap-3 text-sm text-white">
						<span title={t('low')}>L {day.minTemp}°</span>
						<span title={t('high')}>H {day.maxTemp}°</span>
					</div>
				</div>
			))}
		</div>
	);
}
