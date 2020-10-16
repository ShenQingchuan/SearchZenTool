export type LoggerFuncType = (message: string) => void;
export type Logger = {
  [key: string]: LoggerFuncType;
};
export type LoggerType = Record<LoggerLevel, LoggerFuncType>;
export type LoggerLevel = 'info' | 'warn' | 'error' | 'debug';
const usualLoggerLevels: LoggerLevel[] = ['info', 'warn', 'error', 'debug'];

export const logger = {} as LoggerType;
usualLoggerLevels.forEach(level => {
  logger[level] = message => {
    console[level](
      `[Search Zen Tool Render] - ${level.toUpperCase()} - ${message}`
    );
  };
});

function createLoggerPlugin() {
  return {
    install: (Vue: any) => {
      Vue.prototype.$rlogger = logger;
    }
  };
}
export default createLoggerPlugin;
