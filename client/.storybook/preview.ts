import type { Preview } from '@storybook/react-vite'
import '../src/index.css';
import { ToastProvider } from '../src/ui';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => React.createElement(
      ToastProvider,
      null,
      React.createElement(Story, null)
    ),
  ],
};

export default preview;