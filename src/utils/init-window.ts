export default function initWindow(
  electronInstance: typeof Electron,
  weight?: number,
  height?: number
): typeof Electron {
  if (weight && height) {
    electronInstance.remote.BrowserWindow.getFocusedWindow()?.setSize(
      weight,
      height,
      true
    );
  }

  return electronInstance;
}
