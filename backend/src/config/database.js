const knex = require('knex');
const config = require('./index');

const dbConfig = {
  client: 'postgresql',
  connection: {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    ssl: config.database.ssl ? { rejectUnauthorized: false } : false
  },
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100
  },
  migrations: {
    directory: '../database/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: '../database/seeds'
  },
  debug: config.nodeEnv === 'development'
};

// Create Knex instance
const db = knex(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('✅ Database connection successful');
    
    // Check if PostGIS is available
    if (config.database.postgisEnabled) {
      const postgisResult = await db.raw('SELECT PostGIS_Version()');
      console.log('✅ PostGIS available:', postgisResult.rows[0].postgis_version);
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize PostGIS extensions
const initializePostGIS = async () => {
  if (!config.database.postgisEnabled) return;
  
  try {
    await db.raw('CREATE EXTENSION IF NOT EXISTS postgis');
    await db.raw('CREATE EXTENSION IF NOT EXISTS postgis_topology');
    await db.raw('CREATE EXTENSION IF NOT EXISTS fuzzystrmatch');
    await db.raw('CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder');
    console.log('✅ PostGIS extensions initialized');
  } catch (error) {
    console.error('❌ PostGIS initialization failed:', error.message);
  }
};

// Create spatial indexes
const createSpatialIndexes = async () => {
  if (!config.database.postgisEnabled) return;
  
  try {
    // Create spatial indexes for tables with geometry columns
    const tablesWithGeometry = [
      'assets',
      'incidents',
      'weather_stations',
      'fire_perimeters',
      'flood_zones',
      'demographics'
    ];
    
    for (const table of tablesWithGeometry) {
      try {
        await db.raw(`CREATE INDEX IF NOT EXISTS idx_${table}_geom ON ${table} USING GIST (geometry)`);
      } catch (error) {
        // Table might not exist yet, that's okay
        console.log(`ℹ️  Spatial index for ${table} will be created when table exists`);
      }
    }
  } catch (error) {
    console.error('❌ Spatial index creation failed:', error.message);
  }
};

module.exports = {
  db,
  testConnection,
  initializePostGIS,
  createSpatialIndexes
};
