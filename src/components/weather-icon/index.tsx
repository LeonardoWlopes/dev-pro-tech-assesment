import {
	Cloud,
	CloudDrizzle,
	CloudFog,
	CloudLightning,
	CloudRain,
	CloudSnow,
	Sun,
} from 'lucide-react';
import { cn } from '~/utils/cn';
import type { WeatherIconProps } from './types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
	'01d': Sun,
	'01n': Sun,
	'02d': Cloud,
	'02n': Cloud,
	'03d': Cloud,
	'03n': Cloud,
	'04d': Cloud,
	'04n': Cloud,
	'09d': CloudDrizzle,
	'09n': CloudDrizzle,
	'10d': CloudRain,
	'10n': CloudRain,
	'11d': CloudLightning,
	'11n': CloudLightning,
	'13d': CloudSnow,
	'13n': CloudSnow,
	'50d': CloudFog,
	'50n': CloudFog,
};

const sizeClasses = {
	sm: 'size-8',
	md: 'size-12',
	lg: 'size-24',
} as const;

function WeatherIcon({
	icon = '01d',
	className,
	size = 'md',
}: WeatherIconProps) {
	const IconComponent = ICON_MAP[icon] ?? Sun;

	return (
		<IconComponent
			className={cn('text-white', sizeClasses[size], className)}
			aria-hidden
		/>
	);
}

export { WeatherIcon };
