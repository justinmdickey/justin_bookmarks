# Bookmarks App

A modern, clean bookmark manager built with Next.js, ShadCN/UI, and TypeScript. Features a dashboard with live time and weather, organized bookmark categories with favicons, and easy editing capabilities.

## Features

- 🔖 **Organized Bookmarks** - Categorized with custom icons
- 🌤️ **Weather Dashboard** - Current weather with location detection
- ⏰ **Live Clock** - Real-time 12-hour format display
- 🔐 **Password Protection** - Simple authentication to secure access
- 🎨 **Dark Mode** - Modern dark theme by default
- ✏️ **Easy Editing** - Global edit mode toggle
- 🏷️ **Smart Icons** - Real favicons with fallbacks
- 📱 **Responsive** - Works on all screen sizes

## Quick Start with Docker

1. **Clone and setup:**
   ```bash
   git clone <your-repo>
   cd bookmarks-app
   cp .env.example .env
   ```

2. **Configure your environment in `.env`:**
   ```bash
   OPENWEATHER_API_KEY=your_api_key_here
   AUTH_PASSWORD=your_secure_password
   ```
   - Get a free OpenWeather API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Set a secure password to protect access to your bookmarks

3. **Run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

4. **Access the app:**
   Open http://localhost:3001

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment:**
   ```bash
   cp .env.local.example .env.local
   # Add your OpenWeather API key
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

## Configuration

### Weather
- Uses geolocation first, falls back to Greenfield, IN
- Caches weather data for 10 minutes
- Shows cached data while loading fresh data

### Bookmarks
- Edit `lib/bookmarks-data.ts` to customize your bookmarks
- Categories support custom icons
- Favicons auto-load from domains

## Docker Deployment

The app is optimized for Docker deployment with:
- Multi-stage build for minimal image size
- Standalone output for faster container startup
- Non-root user for security
- Proper caching layers

### Production Build
```bash
docker build -t bookmarks-app .
docker run -p 3000:3000 -e OPENWEATHER_API_KEY=your_key bookmarks-app
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ShadCN/UI** - Component library
- **Lucide React** - Icons
- **Docker** - Containerization

## License

MIT