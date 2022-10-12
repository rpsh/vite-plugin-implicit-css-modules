# vite-plugin-implicit-css-modules
> Implicitly replace class names using Vue css modules

## Installation

```bash
npm install -D vite-plugin-implicit-css-modules # npm
yarn add -D vite-plugin-implicit-css-modules # yarn
```

```js
// vite.config.ts
import vitePluginImplicitCssModules from 'vite-plugin-implicit-css-modules';

export default defineConfig({
  plugins: [
    {
      ...vitePluginImplicitCssModules(),
      // Adjust the order of this plugin. https://vitejs.dev/guide/api-plugin.html#plugin-ordering
      enforce: 'pre',
    },
    vue()
  ],
  css: {
    modules: {
      // https://github.com/madyankin/postcss-modules#generating-scoped-names
      generateScopedName: '[local]___[hash:base64:5]',
      // https://github.com/madyankin/postcss-modules#localsconvention
      localsConvention: 'camelCase',
    },
  },
})
```


## Example
[example](./example/)
