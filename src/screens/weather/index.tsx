import { CloudSun, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CitySearch } from '~/components/city-search';
import { CurrentWeather } from '~/components/current-weather';
import { Disclaimer } from '~/components/disclaimer';
import { FiveDayForecast } from '~/components/five-day-forecast';
import { Skeleton } from '~/components/ui/skeleton';
import { DisclaimerVariant } from '~/enums/weather';
import { getWeatherGradient } from '~/utils/weather-gradient';
import { useWeatherScreenContainer } from './container';

export function WeatherScreen() {
	const { t } = useTranslation('weather');

	const {
		searchValue,
		onSearchChange,
		cities,
		selectedCity,
		onSelectCity,
		currentWeather,
		isLoading,
		isSearching,
		forecastWeather,
	} = useWeatherScreenContainer();

	return (
		<div className="flex min-h-svh flex-col lg:flex-row">
			<aside className="flex w-full shrink-0 flex-col gap-6 border-border border-b bg-background p-6 lg:w-[320px] lg:border-r lg:border-b-0">
				<h2 className="font-bold text-2xl">{t('title')}</h2>

				<CitySearch
					search={searchValue}
					onSearchChange={onSearchChange}
					cities={cities}
					selectedCity={selectedCity}
					onSelectCity={onSelectCity}
					isSearching={isSearching}
				/>

				<div className="mt-auto">
					<Disclaimer variant={DisclaimerVariant.Sidebar} />
				</div>
			</aside>

			<main
				className="flex flex-1 flex-col gap-8 p-6 lg:p-8"
				style={getWeatherGradient(currentWeather?.weather?.[0]?.main)}
			>
				<div className="flex items-center justify-between">
					<h2 className="font-bold text-2xl text-white">{t('title')}</h2>
					<a
						href="https://github.com/LeonardoWlopes/dev-pro-tech-assesment"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 rounded-md bg-white/20 px-3 py-2 text-white transition-colors hover:bg-white/30"
					>
						<Github className="size-5" />
						<span className="font-medium text-sm">{t('github')}</span>
					</a>
				</div>

				{isLoading ? (
					<div className="flex flex-1 flex-col items-center justify-evenly gap-8">
						<div className="flex flex-col items-center gap-2 text-center">
							<Skeleton className="size-24 rounded-full bg-white/20" />
							<Skeleton className="h-8 w-40 bg-white/20" />
							<Skeleton className="h-16 w-24 bg-white/20" />
							<Skeleton className="h-5 w-32 bg-white/20" />
						</div>

						<div className="flex flex-wrap justify-center gap-4">
							{Array.from({ length: 5 }).map((_, index) => (
								<Skeleton
									key={`day-${index + 1}`}
									className="h-[120px] min-w-[110px] rounded-xl bg-white/20"
								/>
							))}
						</div>
					</div>
				) : currentWeather ? (
					<div className="flex flex-1 flex-col items-center justify-evenly gap-4">
						<CurrentWeather
							weather={currentWeather}
							displayCity={selectedCity}
						/>

						{forecastWeather?.length > 0 && (
							<FiveDayForecast forecast={forecastWeather} />
						)}
					</div>
				) : (
					<div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
						<CloudSun className="size-24 text-white/60" />

						<p className="text-center text-white/90">{t('empty_state')}</p>
					</div>
				)}

				<div className="mt-auto">
					<Disclaimer variant={DisclaimerVariant.Main} />
				</div>
			</main>
		</div>
	);
}
