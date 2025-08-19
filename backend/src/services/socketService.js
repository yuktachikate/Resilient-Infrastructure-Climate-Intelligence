const logger = require('../utils/logger');

class SocketService {
  constructor() {
    this.io = null;
    this.connectedClients = new Map();
  }

  initialize(io) {
    this.io = io;
    
    io.on('connection', (socket) => {
      logger.info(`Client connected: ${socket.id}`);
      this.connectedClients.set(socket.id, socket);

      // Handle client disconnection
      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });

      // Handle dashboard updates
      socket.on('join-dashboard', (data) => {
        socket.join('dashboard');
        logger.info(`Client ${socket.id} joined dashboard`);
      });

      // Handle real-time data requests
      socket.on('request-update', (data) => {
        this.sendUpdate(socket, data);
      });
    });

    // Start periodic updates
    this.startPeriodicUpdates();
  }

  sendUpdate(socket, data) {
    // Mock real-time data updates
    const mockUpdate = {
      timestamp: new Date().toISOString(),
      type: data.type || 'general',
      data: {
        systemHealth: Math.floor(Math.random() * 20) + 80, // 80-100
        activeIncidents: Math.floor(Math.random() * 10) + 1, // 1-10
        energyDemand: Math.floor(Math.random() * 30) + 70, // 70-100
      }
    };

    socket.emit('update', mockUpdate);
  }

  startPeriodicUpdates() {
    // Send periodic updates to all connected clients
    setInterval(() => {
      if (this.io) {
        const update = {
          timestamp: new Date().toISOString(),
          type: 'periodic',
          data: {
            systemHealth: Math.floor(Math.random() * 20) + 80,
            activeIncidents: Math.floor(Math.random() * 10) + 1,
            energyDemand: Math.floor(Math.random() * 30) + 70,
            weatherAlerts: Math.floor(Math.random() * 5),
          }
        };

        this.io.to('dashboard').emit('periodic-update', update);
      }
    }, 30000); // Update every 30 seconds
  }

  broadcastToAll(event, data) {
    if (this.io) {
      this.io.emit(event, data);
    }
  }

  broadcastToRoom(room, event, data) {
    if (this.io) {
      this.io.to(room).emit(event, data);
    }
  }
}

module.exports = new SocketService();
