import type { CSSProperties } from 'react';

export function getWeatherGradient(weatherMain?: string): CSSProperties {
	const gradient =
		WEATHER_GRADIENTS[weatherMain ?? ''] ?? WEATHER_GRADIENTS.Default;
	return { backgroundImage: gradient };
}

const WEATHER_GRADIENTS: Record<string, string> = {
	Clear: 'linear-gradient(to bottom, #38bdf8 0%, #fbbf24 50%, #fb923c 100%)',
	Clouds: 'linear-gradient(to bottom, #94a3b8 0%, #64748b 50%, #475569 100%)',
	Rain: 'linear-gradient(to bottom, #64748b 0%, #475569 50%, #334155 100%)',
	Drizzle: 'linear-gradient(to bottom, #64748b 0%, #94a3b8 100%)',
	Thunderstorm:
		'linear-gradient(to bottom, #475569 0%, #1e293b 50%, #0f172a 100%)',
	Snow: 'linear-gradient(to bottom, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
	Mist: 'linear-gradient(to bottom, #94a3b8 0%, #cbd5e1 100%)',
	Smoke: 'linear-gradient(to bottom, #78716c 0%, #57534e 100%)',
	Haze: 'linear-gradient(to bottom, #a8a29e 0%, #78716c 100%)',
	Dust: 'linear-gradient(to bottom, #d6d3d1 0%, #a8a29e 100%)',
	Fog: 'linear-gradient(to bottom, #a8a29e 0%, #78716c 100%)',
	Sand: 'linear-gradient(to bottom, #fcd34d 0%, #f59e0b 100%)',
	Ash: 'linear-gradient(to bottom, #78716c 0%, #57534e 100%)',
	Squall: 'linear-gradient(to bottom, #475569 0%, #334155 100%)',
	Tornado: 'linear-gradient(to bottom, #57534e 0%, #292524 100%)',
	Default: 'linear-gradient(to bottom, #38bdf8 0%, #2563eb 100%)',
};
