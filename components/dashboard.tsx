'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, CloudSnow, Zap, CloudFog } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  description: string;
  icon: string;
  location: string;
}

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load cached weather data on mount
  useEffect(() => {
    const cachedWeather = localStorage.getItem('weatherData');
    const cacheTimestamp = localStorage.getItem('weatherTimestamp');
    
    if (cachedWeather && cacheTimestamp) {
      const now = Date.now();
      const cacheAge = now - parseInt(cacheTimestamp);
      const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
      
      if (cacheAge < CACHE_DURATION) {
        // Use cached data if less than 10 minutes old
        setWeather(JSON.parse(cachedWeather));
        setLoading(false);
      }
    }
  }, []);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // You'll need to set your OpenWeather API key as an environment variable
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        
        // Use Indianapolis, IN
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Indianapolis,IN,US&appid=${API_KEY}&units=imperial`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API failed');
        
        const data = await response.json();
        
        const weatherData = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          location: data.name
        };
        
        setWeather(weatherData);
        
        // Cache the weather data
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
        localStorage.setItem('weatherTimestamp', Date.now().toString());
      } catch (error) {
        console.error('Weather fetch failed:', error);
        
        // Try to use cached data even if expired, as fallback
        const cachedWeather = localStorage.getItem('weatherData');
        if (cachedWeather && !weather) {
          setWeather(JSON.parse(cachedWeather));
        } else if (!weather) {
          // Final fallback weather data
          const fallbackWeather = {
            temp: 72,
            condition: 'Clear',
            description: 'clear sky',
            icon: '01d',
            location: 'Indianapolis'
          };
          setWeather(fallbackWeather);
          
          // Cache fallback data
          localStorage.setItem('weatherData', JSON.stringify(fallbackWeather));
          localStorage.setItem('weatherTimestamp', Date.now().toString());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [weather]);

  const getWeatherIcon = (condition: string, iconCode: string) => {
    const baseClass = "h-6 w-6";
    
    // Use OpenWeather icon codes for more accurate mapping
    switch (iconCode.substring(0, 2)) {
      case '01': // clear sky
        return <Sun className={`${baseClass} text-yellow-500`} />;
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return <Cloud className={`${baseClass} text-gray-500`} />;
      case '09': // shower rain
      case '10': // rain
        return <CloudRain className={`${baseClass} text-blue-500`} />;
      case '11': // thunderstorm
        return <Zap className={`${baseClass} text-purple-500`} />;
      case '13': // snow
        return <CloudSnow className={`${baseClass} text-blue-200`} />;
      case '50': // mist/fog
        return <CloudFog className={`${baseClass} text-gray-400`} />;
      default:
        return <Sun className={`${baseClass} text-yellow-500`} />;
    }
  };

  return (
    <Card className="h-fit">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Time Section */}
          <div className="text-center">
            <div className="text-3xl font-bold font-mono">
              {currentTime}
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Weather Section */}
          <div className="flex justify-center">
            {loading ? (
              <div className="text-muted-foreground">Loading weather...</div>
            ) : weather ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(weather.condition, weather.icon)}
                  <div className="text-2xl font-bold">{weather.temp}°F</div>
                </div>
                <div className="text-xs text-muted-foreground capitalize text-center">
                  {weather.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {weather.location}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">Weather unavailable</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}