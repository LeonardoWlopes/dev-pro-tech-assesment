import { ChevronsUpDown, MapPin } from 'lucide-react';
import { useCallback, useState } from 'react';
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
import type { City } from '~/lib/mock-types';
import { formatCityLabel } from '~/utils/city';
import { cn } from '~/utils/cn';
import type { CitySearchProps } from './types';

function CitySearch({
	search,
	onSearchChange,
	cities,
	selectedCity,
	onSelectCity,
}: CitySearchProps) {
	const [open, setOpen] = useState(false);

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
					aria-label="Select city"
					className={cn(
						'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-left text-base shadow-xs outline-none transition-[color,box-shadow]',
						'hover:bg-accent/50',
						'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
					)}
				>
					<span className={cn(!displayValue && 'text-muted-foreground')}>
						{displayValue || 'Search by city'}
					</span>

					<ChevronsUpDown className="size-4 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className="w-(--radix-popover-trigger-width) p-0"
				align="start"
			>
				<Command
					shouldFilter={false}
					value={search}
					onValueChange={onSearchChange}
				>
					<CommandInput placeholder="Search by city..." />

					<CommandList>
						<CommandEmpty>No city found.</CommandEmpty>

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
