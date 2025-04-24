import { createRoot } from 'react-dom/client';
import ToastsConfirmation from './ToastsConfirmation';

export function showToastConfirmation(): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
        <ToastsConfirmation
          onClose={(result: boolean) => {
            resolve(result);
            root.unmount();
            container.remove();
          }}
        />
    );
  });
}
