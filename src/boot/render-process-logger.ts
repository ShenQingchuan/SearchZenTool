import createRenderLoggerPlugin from '../utils/render-process-logger';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  const renderLoggerPlugin = createRenderLoggerPlugin();
  Vue.use(renderLoggerPlugin);
});
