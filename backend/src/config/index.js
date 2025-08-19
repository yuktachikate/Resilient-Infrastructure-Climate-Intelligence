require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'rici_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: process.env.DB_SSL === 'true',
    postgisEnabled: process.env.POSTGIS_ENABLED === 'true'
  },

  // Authentication
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },

  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null
  },

  // External APIs
  apis: {
    weather: {
      key: process.env.WEATHER_API_KEY || '',
      baseUrl: process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5'
    },
    fire: {
      key: process.env.FIRE_API_KEY || '',
      baseUrl: process.env.FIRE_API_URL || 'https://firms.modaps.eosdis.nasa.gov/api'
    },
    arcgis: {
      clientId: process.env.ARCGIS_CLIENT_ID || '',
      clientSecret: process.env.ARCGIS_CLIENT_SECRET || '',
      baseUrl: process.env.ARCGIS_BASE_URL || 'https://services.arcgis.com'
    },
    powerbi: {
      clientId: process.env.POWERBI_CLIENT_ID || '',
      clientSecret: process.env.POWERBI_CLIENT_SECRET || '',
      tenantId: process.env.POWERBI_TENANT_ID || '',
      workspaceId: process.env.POWERBI_WORKSPACE_ID || ''
    }
  },

  // File Upload
  upload: {
    maxSize: process.env.MAX_FILE_SIZE || '10mb',
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/csv', 'application/vnd.ms-excel'],
    uploadDir: process.env.UPLOAD_DIR || './uploads'
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log'
  },

  // Security
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000, // 15 minutes
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100
  },

  // Data Ingestion
  dataIngestion: {
    batchSize: parseInt(process.env.BATCH_SIZE) || 1000,
    interval: parseInt(process.env.INGESTION_INTERVAL) || 300000, // 5 minutes
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS) || 3
  },

  // GIS Configuration
  gis: {
    defaultSrid: 4326, // WGS84
    bufferDistance: parseFloat(process.env.BUFFER_DISTANCE) || 1000, // meters
    maxFeatures: parseInt(process.env.MAX_FEATURES) || 10000
  },

  // Power BI Configuration
  powerbi: {
    reportRefreshInterval: parseInt(process.env.PBI_REFRESH_INTERVAL) || 300000, // 5 minutes
    maxConcurrentRequests: parseInt(process.env.PBI_MAX_CONCURRENT) || 10
  },

  // Email Configuration (for notifications)
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || ''
  },

  // Monitoring
  monitoring: {
    enabled: process.env.MONITORING_ENABLED === 'true',
    metricsPort: parseInt(process.env.METRICS_PORT) || 9090
  }
};

// Validate required configuration
const requiredConfigs = [
  'database.host',
  'database.name',
  'database.user',
  'jwt.secret'
];

requiredConfigs.forEach(configPath => {
  const value = configPath.split('.').reduce((obj, key) => obj?.[key], config);
  if (!value) {
    throw new Error(`Missing required configuration: ${configPath}`);
  }
});

module.exports = config;
