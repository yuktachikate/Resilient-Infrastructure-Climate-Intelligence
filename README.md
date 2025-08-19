# Resilient Infrastructure & Climate Intelligence (RICI)

A comprehensive dashboard suite that integrates climate-risk analytics, asset management, operations, finance, and environmental stewardship into one unified platform.

## 🌟 Features

### Climate & Hazard Risk Dashboard
- **Wildfire & Extreme Weather**: Historical fire perimeters, risk zones, weather forecasts, and WUI growth
- **Flood & Heat**: Floodplain maps, temperature anomalies, and heat-wave indices
- **Vulnerability Overlay**: Critical facilities mapping with demographic data for risk assessment

### Infrastructure Health & Predictive Maintenance
- **Asset Registry**: Power lines, substations, poles, water pipes, and transport infrastructure mapping
- **Predictive Maintenance**: Sensor data integration for equipment failure prediction
- **Capacity & Demand**: Energy demand monitoring and legacy asset strain identification

### Operations & Workforce Efficiency
- **Crew Deployment**: Work-order backlogs, crew locations, and travel time optimization
- **Efficiency Metrics**: Mean time to repair, dispatch accuracy, and workload balance
- **Safety Monitoring**: Hazardous area overlays during extreme events

### Data Quality & Communication Dashboard
- **Data Completeness**: Gap analysis, duplicate detection, and sensor feed latency monitoring
- **Communication**: Real-time status updates from field crews and dispatch

### Energy & Sustainability Dashboard
- **Generation Mix & Consumption**: Energy production by fuel type and sector demand
- **Efficiency & Emissions**: Energy efficiency improvements and emissions tracking

### Finance & Investment Dashboard
- **Capex & Opex**: Infrastructure upgrade spending and vegetation management tracking
- **ROI & Risk Reduction**: Cost-benefit analysis for resilience projects
- **Funding Sources**: Grant, bond, and public-private partnership monitoring

### Land & Environmental Stewardship
- **Land-Use & Conservation**: Zoning overlays, protected areas, and biodiversity hotspots
- **Water Resources**: Watershed mapping, reservoir levels, and drought indices

### Public Safety & Community Dashboard
- **Incident Response**: Active incident tracking and emergency response optimization
- **Community Outreach**: Alert systems and emergency communication access

## 🏗️ Architecture

### Data Model
- **Star Schema**: Core fact tables with dimension tables for comprehensive analytics
- **Spatial Storage**: PostGIS integration for geospatial operations
- **Lakehouse Architecture**: Raw, curated, and analytics data layers

### Technology Stack
- **Frontend**: React.js with Material-UI for responsive dashboards
- **Backend**: Node.js/Express with PostgreSQL and PostGIS
- **Analytics**: Power BI integration with DAX measures
- **GIS**: ArcGIS/Mapbox integration for spatial visualization
- **Real-time**: WebSocket connections for live data updates
- **Authentication**: JWT-based security with role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ with PostGIS extension
- Power BI Desktop
- ArcGIS Developer Account (optional for advanced features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RICI-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize database**
   ```bash
   npm run db:setup
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

## 📊 Dashboard Access

- **Main Dashboard**: http://localhost:3000
- **Power BI Reports**: http://localhost:3000/powerbi
- **ArcGIS Maps**: http://localhost:3000/maps
- **API Documentation**: http://localhost:3001/api-docs

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/rici_db
POSTGIS_ENABLED=true

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h

# Power BI
POWERBI_CLIENT_ID=your-powerbi-client-id
POWERBI_CLIENT_SECRET=your-powerbi-client-secret
POWERBI_TENANT_ID=your-powerbi-tenant-id

# ArcGIS
ARCGIS_CLIENT_ID=your-arcgis-client-id
ARCGIS_CLIENT_SECRET=your-arcgis-client-secret

# External APIs
WEATHER_API_KEY=your-weather-api-key
FIRE_API_KEY=your-fire-api-key
```

## 📈 Implementation Phases

### Phase 1: Discovery (2-4 weeks)
- [x] Project setup and architecture design
- [x] Core data model implementation
- [x] Basic dashboard framework

### Phase 2: MVP (8-12 weeks)
- [ ] Climate & Hazard Risk Dashboard
- [ ] Infrastructure Health Dashboard
- [ ] Core asset and weather data ingestion
- [ ] Basic risk scoring implementation

### Phase 3: Scale-out (12-16 weeks)
- [ ] Operations & Workforce Dashboard
- [ ] Data Quality & Communication Dashboard
- [ ] Finance & Investment Dashboard
- [ ] Land & Environmental Stewardship Dashboard
- [ ] Advanced analytics and ML models

### Phase 4: Continuous Improvement
- [ ] Satellite imagery integration
- [ ] Risk model refinement
- [ ] User feedback integration
- [ ] Multi-region expansion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation at `/docs`

## 🔮 Roadmap

- [ ] Machine Learning integration for predictive analytics
- [ ] Mobile application for field crews
- [ ] IoT sensor network integration
- [ ] Advanced GIS analysis tools
- [ ] Multi-language support
- [ ] Cloud deployment options
