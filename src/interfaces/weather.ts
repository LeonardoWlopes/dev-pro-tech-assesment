import type { ICoordinates } from './location';

export interface IWeatherMain {
	temp: number;
	temp_min?: number;
	temp_max?: number;
}

export interface IWeather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface IWeatherData {
	name: string;
	main: IWeatherMain;
	weather: IWeather[];
	dt: number;
	sys?: { country?: string };
}

export interface IWeatherForecastDay {
	day: string;
	minTemp: number;
	maxTemp: number;
	icon: string;
	main: string;
}

export interface IWeatherForecast {
	list: IWeatherData[];
	city: { name: string; coord: ICoordinates };
}
