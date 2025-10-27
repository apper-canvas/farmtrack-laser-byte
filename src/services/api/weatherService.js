// Mock weather data - No database table available
const mockWeatherData = [
  {
    date: "2024-12-15T00:00:00.000Z",
    temperature: { high: 72, low: 58 },
    condition: "sunny",
    precipitation: 0,
    humidity: 45
  },
  {
    date: "2024-12-16T00:00:00.000Z",
    temperature: { high: 75, low: 60 },
    condition: "partly_cloudy",
    precipitation: 10,
    humidity: 55
  },
  {
    date: "2024-12-17T00:00:00.000Z",
    temperature: { high: 68, low: 54 },
    condition: "cloudy",
    precipitation: 30,
    humidity: 65
  },
  {
    date: "2024-12-18T00:00:00.000Z",
    temperature: { high: 65, low: 52 },
    condition: "rainy",
    precipitation: 75,
    humidity: 80
  },
  {
    date: "2024-12-19T00:00:00.000Z",
    temperature: { high: 70, low: 56 },
    condition: "partly_cloudy",
    precipitation: 20,
    humidity: 60
  }
];

class WeatherService {
  constructor() {
    this.cache = null;
    this.cacheTime = null;
    this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
  }

  async getForecast() {
    await this.delay(500);
    
    // Check cache
    if (this.cache && this.cacheTime && (Date.now() - this.cacheTime < this.cacheExpiry)) {
      return [...this.cache];
    }

    // Simulate weather API call with mock data
    const forecast = mockWeatherData.map(day => ({ ...day }));
    
    // Cache the result
    this.cache = forecast;
    this.cacheTime = Date.now();
    
    return forecast;
  }

  async getCurrentWeather() {
    await this.delay(300);
    const forecast = await this.getForecast();
    return forecast.length > 0 ? { ...forecast[0] } : null;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new WeatherService();