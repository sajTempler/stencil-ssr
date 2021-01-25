import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'client',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    { type: 'dist-hydrate-script' },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  rollupPlugins: {
    after: [
      nodePolyfills(),
    ]
  }
};
