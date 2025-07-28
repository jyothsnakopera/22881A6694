
// src/middleware/logger.js
const logEvent = (eventType, message, additionalData = {}) => {
  console.log(`[Logger] ${eventType}:`, {
    message,
    ...additionalData,
  });
};

export default logEvent;
