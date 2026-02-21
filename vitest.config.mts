import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		watch: false,
		environment: 'jsdom',
		passWithNoTests: true,
		include: ['src/**/*.spec.ts'],
		coverage: {
			include: ['src/**/*.ts', 'src/**/container.tsx'],
			exclude: [
				'**/__tests__/**',
				'**/*.spec.*',
				'**/*.d.ts',
				'**/node_modules/**',
				'**/enums/**',
				'**/interfaces/**',
				'**/types.ts/**',
				'**/i18n/**',
				'**/services/**',
			],
			reporter: ['html', 'json-summary', 'clover', 'json'],
		},
	},
});
