/* v8 ignore start */

import { z } from 'zod';
import { t } from '~/i18n/config';

const envSchema = z.object({
	OPENWEATHER_API_KEY: z.string().min(1),
	DEV: z.boolean().default(false),
});

const _env = envSchema.safeParse({
	API_BASE_URL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
	OPENWEATHER_API_KEY: import.meta.env.VITE_PUBLIC_OPENWEATHER_API_KEY,
	DEV: import.meta.env.DEV,
});

if (!_env.success) {
	const errorTable = Object.entries(_env.error.flatten().fieldErrors).reduce(
		(acc, [key, value]) => {
			acc[key] = value.join(', ');
			return acc;
		},
		{} as Record<string, string>,
	);

	throw new Error(
		`${t('environment_variables', { ns: 'errors' })} \n${JSON.stringify(errorTable, null, 2)}`,
	);
}

export const env = _env.data;
/* v8 ignore end */
