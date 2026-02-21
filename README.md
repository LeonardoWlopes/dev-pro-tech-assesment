# Dev Pro Tech Assessment

A weather web application demonstrating scalable architecture with city search, current weather display, 5-day forecast, state management (React Query), and internationalization.

## Tech Stack

- **React**: UI framework
- **Vite**: Build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **React Query**: Server state management and data fetching
- **Tailwind CSS**: Utility-first styling
- **i18next**: Internationalization (i18n) support

## Prerequisites

Before starting, ensure you have the following tools installed:

- **Node.js**: v24.12.0 or higher (see [.nvmrc](.nvmrc))
- **pnpm**: v10.13.1 or higher

You can verify installed versions by running:

```bash
node -v
pnpm -v
```

## Installation

Install dependencies:

```bash
pnpm install
```

## Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and set:

| Variable                      | Description                          |
| ---------------------------- | ------------------------------------ |
| `VITE_PUBLIC_OPENWEATHER_API_KEY` | Your [OpenWeather](https://openweathermap.org/api) API key |

## Running the Application

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Linting

Run lint and auto-fix:

```bash
pnpm lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── city-search/  # City search with Nominatim API
│   ├── current-weather/
│   ├── five-day-forecast/
│   ├── weather-icon/
│   ├── disclaimer/
│   └── ui/           # shadcn/ui components
├── screens/          # Screen components
│   └── weather/
├── services/         # API services and React Query hooks
│   ├── location.ts   # Nominatim geocoding
│   └── weather.ts   # OpenWeather API
├── hooks/            # Custom hooks (e.g. useDebouncedValue)
├── providers/        # Context providers (QueryProvider)
├── i18n/             # Internationalization configuration
├── interfaces/       # TypeScript type definitions
├── utils/            # Utility functions
└── enums/            # Enums and constants
```

## Features

- **City Search**: Search cities worldwide via Nominatim API with debounced input
- **Current Weather**: Display temperature, condition, and location from OpenWeather
- **5-Day Forecast**: Daily forecast with min/max temperatures
- **Dynamic Gradient**: Background changes based on weather condition (clear, rain, snow, etc.)
- **Responsive Layout**: Mobile-optimized with reduced font scaling
- **Internationalization**: All UI text in i18n with namespace support

## APIs Used

- [OpenWeather](https://openweathermap.org/) — Current weather and 5-day forecast
- [Nominatim](https://nominatim.openstreetmap.org/) — City search and geocoding
