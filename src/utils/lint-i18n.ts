/* v8 ignore start */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };

function sortObjectByKeys(unsorted: { [key: string]: JsonValue }): {
	[key: string]: JsonValue;
} {
	return Object.keys(unsorted)
		.sort()
		.reduce((result: { [key: string]: JsonValue }, key) => {
			const value = unsorted[key];
			result[key] =
				typeof value === 'object' && value !== null && !Array.isArray(value)
					? sortObjectByKeys(value)
					: value;
			return result;
		}, {});
}

function exec() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const __rootPath = path.resolve(__dirname, '../');
	const directoryPath = path.join(__rootPath, './i18n/languages');

	fs.readdir(directoryPath, (err, files) => {
		if (err) return;

		for (const file of files ?? []) {
			if (path.extname(file) === '.json') {
				const filePath = path.join(directoryPath, file);
				fs.readFile(filePath, 'utf8', (readErr, data) => {
					if (readErr) {
						console.error('Error reading file:', readErr);
						return;
					}
					const jsonData: JsonValue = JSON.parse(data);
					const sortedJsonData = sortObjectByKeys(
						jsonData as { [key: string]: JsonValue },
					);
					fs.writeFile(
						filePath,
						JSON.stringify(sortedJsonData, null, '\t'),
						'utf8',
						(writeErr) => {
							if (writeErr) console.error('Error writing file:', writeErr);
						},
					);
				});
			}
		}
	});
}

exec();
/* v8 ignore end */
