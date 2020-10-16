import { LoggerLevel } from './render-process-logger';

declare module 'vue/types/vue' {
  interface Vue {
    $rlogger: Record<LoggerLevel, (message: string) => void>;
  }
}
