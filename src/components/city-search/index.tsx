import { ChevronsUpDown, Loader2, MapPin } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover';
import type { City } from '~/interfaces/location';
import { formatCityLabel } from '~/utils/city';
import { cn } from '~/utils/cn';
import type { CitySearchProps } from './types';

function CitySearch({
	search,
	onSearchChange,
	cities,
	selectedCity,
	onSelectCity,
	isSearching = false,
}: CitySearchProps) {
	const [open, setOpen] = useState(false);

	const { t } = useTranslation('city_search');

	const handleSelect = useCallback(
		(city: City) => {
			onSelectCity(city);
			setOpen(false);
		},
		[onSelectCity],
	);

	const displayValue = selectedCity ? formatCityLabel(selectedCity) : search;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					role="combobox"
					aria-expanded={open}
					aria-label={t('aria_select_city')}
					className={cn(
						'flex h-9 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-left text-base shadow-xs outline-none transition-[color,box-shadow]',
						'hover:bg-accent/50',
						'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
					)}
				>
					<span
						className={cn(
							'min-w-0 truncate',
							!displayValue && 'text-muted-foreground',
						)}
					>
						{displayValue || t('search_by_city')}
					</span>

					<ChevronsUpDown className="size-4 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className="w-(--radix-popover-trigger-width) p-0"
				align="start"
			>
				<Command shouldFilter={false}>
					<CommandInput
						autoFocus
						placeholder={t('placeholder')}
						value={search}
						onValueChange={onSearchChange}
					/>
					{isSearching && (
						<div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground text-sm">
							<Loader2 className="size-4 animate-spin" />
							{t('searching')}
						</div>
					)}

					<CommandList>
						<CommandEmpty>{t('no_city_found')}</CommandEmpty>

						<CommandGroup>
							{cities.map((city) => (
								<CommandItem
									key={`${city.lat}-${city.lon}`}
									value={formatCityLabel(city)}
									onSelect={() => handleSelect(city)}
								>
									<MapPin className="mr-2 size-4 shrink-0" />
									{formatCityLabel(city)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export { CitySearch };
