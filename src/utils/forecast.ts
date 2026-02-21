import { format } from 'date-fns';
import type { IWeatherData, IWeatherForecastDay } from '~/interfaces/weather';

const DAYS_TO_SHOW = 5;

export function aggregateForecastByDay(
	list: IWeatherData[],
): IWeatherForecastDay[] {
	if (list.length === 0) return [];

	const byDate = new Map<string, IWeatherData[]>();

	for (const item of list) {
		const dateKey = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
		const existing = byDate.get(dateKey) ?? [];
		existing.push(item);
		byDate.set(dateKey, existing);
	}

	const sortedDates = [...byDate.keys()].sort().slice(0, DAYS_TO_SHOW);

	const forecast = sortedDates.map((dateKey) => {
		const items = byDate.get(dateKey) ?? [];
		const date = new Date(dateKey);
		const dayLabel = format(date, 'EEE');

		if (items.length === 0) {
			return {
				day: dayLabel,
				minTemp: 0,
				maxTemp: 0,
				icon: '01d',
				main: 'Clear',
			};
		}

		const minTemp = Math.min(
			...items.map((i) => i.main?.temp_min ?? i.main?.temp ?? 0),
		);
		const maxTemp = Math.max(
			...items.map((i) => i.main?.temp_max ?? i.main?.temp ?? 0),
		);

		const middayIndex = Math.min(
			Math.floor(items.length / 2),
			items.length - 1,
		);

		const representative = items[middayIndex];
		const icon = representative?.weather?.[0]?.icon ?? '01d';
		const main = representative?.weather?.[0]?.main ?? 'Clear';

		return {
			day: dayLabel,
			minTemp: Math.round(minTemp),
			maxTemp: Math.round(maxTemp),
			icon,
			main,
		};
	});

	return forecast;
}
