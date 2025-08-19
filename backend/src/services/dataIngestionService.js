const logger = require('../utils/logger');

class DataIngestionService {
  constructor() {
    this.isRunning = false;
    this.interval = null;
  }

  initialize() {
    logger.info('Data Ingestion Service initialized');
    this.startIngestion();
  }

  startIngestion() {
    if (this.isRunning) {
      logger.warn('Data ingestion service is already running');
      return;
    }

    this.isRunning = true;
    logger.info('Starting data ingestion service');

    // Simulate data ingestion every 5 minutes
    this.interval = setInterval(() => {
      this.ingestData();
    }, 300000); // 5 minutes

    // Initial ingestion
    this.ingestData();
  }

  stopIngestion() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
    logger.info('Data ingestion service stopped');
  }

  async ingestData() {
    try {
      logger.info('Starting data ingestion cycle');

      // Simulate ingesting different types of data
      await this.ingestWeatherData();
      await this.ingestInfrastructureData();
      await this.ingestClimateData();
      await this.ingestOperationsData();

      logger.info('Data ingestion cycle completed successfully');
    } catch (error) {
      logger.error('Error during data ingestion:', error);
    }
  }

  async ingestWeatherData() {
    // Simulate weather data ingestion
    logger.info('Ingesting weather data...');
    await this.simulateDelay(1000);
    logger.info('Weather data ingested successfully');
  }

  async ingestInfrastructureData() {
    // Simulate infrastructure data ingestion
    logger.info('Ingesting infrastructure data...');
    await this.simulateDelay(1500);
    logger.info('Infrastructure data ingested successfully');
  }

  async ingestClimateData() {
    // Simulate climate data ingestion
    logger.info('Ingesting climate data...');
    await this.simulateDelay(2000);
    logger.info('Climate data ingested successfully');
  }

  async ingestOperationsData() {
    // Simulate operations data ingestion
    logger.info('Ingesting operations data...');
    await this.simulateDelay(1000);
    logger.info('Operations data ingested successfully');
  }

  async simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastIngestion: new Date().toISOString(),
      nextIngestion: this.interval ? new Date(Date.now() + 300000).toISOString() : null
    };
  }
}

module.exports = new DataIngestionService();
