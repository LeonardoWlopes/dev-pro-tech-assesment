import { useTranslation } from 'react-i18next';
import { DisclaimerVariant } from '~/enums/weather';
import { cn } from '~/utils/cn';
import type { DisclaimerProps } from './types';

export function Disclaimer({ variant }: DisclaimerProps) {
	const { t } = useTranslation('disclaimer');

	return (
		<p
			className={cn(
				'text-xs',
				variant === DisclaimerVariant.Sidebar && 'text-muted-foreground',
				variant === DisclaimerVariant.Main && 'text-white/40',
			)}
		>
			{t('text')}
		</p>
	);
}
