#!/bin/bash

# RICI Project Installation Script
# This script sets up the complete RICI (Resilient Infrastructure & Climate Intelligence) project

set -e

echo "🚀 Starting RICI Project Installation..."
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        print_status "Visit: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "npm $(npm -v) is installed"
}

# Check if Docker is installed (optional)
check_docker() {
    print_status "Checking Docker installation..."
    if command -v docker &> /dev/null; then
        print_success "Docker is installed"
        DOCKER_AVAILABLE=true
    else
        print_warning "Docker is not installed. You can still run the project locally."
        DOCKER_AVAILABLE=false
    fi
}

# Check if PostgreSQL is installed
check_postgres() {
    print_status "Checking PostgreSQL installation..."
    if command -v psql &> /dev/null; then
        print_success "PostgreSQL is installed"
        POSTGRES_AVAILABLE=true
    else
        print_warning "PostgreSQL is not installed. You can use Docker for the database."
        POSTGRES_AVAILABLE=false
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_success "All dependencies installed successfully"
}

# Setup environment file
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f .env ]; then
        cp env.example .env
        print_success "Environment file created from template"
        print_warning "Please edit .env file with your configuration values"
    else
        print_warning "Environment file already exists. Skipping..."
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p backend/logs
    mkdir -p backend/uploads
    mkdir -p frontend/build
    mkdir -p data/sample
    
    print_success "Directories created successfully"
}

# Setup database (if PostgreSQL is available)
setup_database() {
    if [ "$POSTGRES_AVAILABLE" = true ]; then
        print_status "Setting up database..."
        
        # Check if database exists
        if psql -lqt | cut -d \| -f 1 | grep -qw rici_db; then
            print_warning "Database 'rici_db' already exists"
        else
            print_status "Creating database 'rici_db'..."
            createdb rici_db
            print_success "Database created successfully"
        fi
        
        # Check if PostGIS extension is available
        if psql -d rici_db -c "SELECT PostGIS_Version();" &> /dev/null; then
            print_success "PostGIS extension is available"
        else
            print_warning "PostGIS extension not found. Please install PostGIS for full functionality."
        fi
    else
        print_warning "PostgreSQL not available. Database setup skipped."
    fi
}

# Build the project
build_project() {
    print_status "Building the project..."
    
    # Build backend
    print_status "Building backend..."
    cd backend
    npm run build
    cd ..
    
    # Build frontend
    print_status "Building frontend..."
    cd frontend
    npm run build
    cd ..
    
    print_success "Project built successfully"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 RICI Project Installation Complete!"
    echo "======================================"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Configure your environment:"
    echo "   - Edit the .env file with your API keys and database settings"
    echo ""
    echo "2. Start the development servers:"
    echo "   - Run: npm run dev"
    echo "   - Backend will be available at: http://localhost:3001"
    echo "   - Frontend will be available at: http://localhost:3000"
    echo ""
    echo "3. Or use Docker (if available):"
    echo "   - Run: docker-compose up -d"
    echo "   - Access the application at: http://localhost"
    echo ""
    echo "4. API Documentation:"
    echo "   - Available at: http://localhost:3001/api-docs"
    echo ""
    echo "5. Monitoring:"
    echo "   - Grafana: http://localhost:3002 (admin/admin)"
    echo "   - Prometheus: http://localhost:9090"
    echo ""
    echo "For more information, see the README.md file."
    echo ""
}

# Main installation process
main() {
    echo "RICI Project Installation Script"
    echo "================================"
    echo ""
    
    # Check prerequisites
    check_node
    check_npm
    check_docker
    check_postgres
    
    echo ""
    print_status "Starting installation process..."
    echo ""
    
    # Install dependencies
    install_dependencies
    
    # Setup environment
    setup_environment
    
    # Create directories
    create_directories
    
    # Setup database
    setup_database
    
    # Build project
    build_project
    
    # Show next steps
    show_next_steps
}

# Run main function
main "$@"
