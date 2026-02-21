export interface ICoordinates {
	lat: number;
	lon: number;
}

export interface IGeolocationResult {
	place_id: number;
	lat: string;
	lon: string;
	display_name: string;
	address?: IGeolocationAddress;
}

export interface IGeolocationAddress {
	city?: string;
	town?: string;
	village?: string;
	municipality?: string;
	state?: string;
	country?: string;
	country_code?: string;
}
