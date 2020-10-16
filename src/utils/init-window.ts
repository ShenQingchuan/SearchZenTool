import { ComponentRenderProxy } from '@vue/composition-api';

export default function initWindow(
  context: ComponentRenderProxy,
  weight: number = 400,
  height: number = 460
): typeof Electron {
  const electronInstance = context.$q.electron;
  // electronInstance.remote.BrowserWindow.getFocusedWindow()!.center();
  electronInstance.remote.BrowserWindow.getFocusedWindow()!.setSize(
    weight,
    height
  );

  return electronInstance;
}
