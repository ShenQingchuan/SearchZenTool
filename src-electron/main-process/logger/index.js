/* eslint-disable */
/**  @type {any} */
const logger = {};
const usualLoggerLevels = ['info', 'warn', 'error', 'debug'];
usualLoggerLevels.forEach(level => {
  logger[level] = message => {
    console[level](
      `[Search Zen Tool Main] - ${level.toUpperCase()} - ${message}`
    );
  };
});
export default logger;
