import type { City } from '~/interfaces/location';
import type { IWeatherData } from '~/interfaces/weather';

export interface CurrentWeatherProps {
	weather: IWeatherData;
	displayCity?: City | null;
}
