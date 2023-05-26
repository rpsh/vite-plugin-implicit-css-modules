# vite-plugin-implicit-css-modules

> Implicitly replace class names using Vue css modules

## Installation

```bash
npm install -D vite-plugin-implicit-css-modules # npm
yarn add -D vite-plugin-implicit-css-modules # yarn
```

## Usage

### plugin config

```js
// vite.config.ts
import vitePluginImplicitCssModules from 'vite-plugin-implicit-css-modules';

export default defineConfig({
  plugins: [
    {
      ...vitePluginImplicitCssModules(),
      // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
      enforce: 'pre',
    },
    vue(),
  ],
  css: {
    modules: {
      // https://github.com/madyankin/postcss-modules#generating-scoped-names
      generateScopedName: '[local]___[hash:base64:5]',
      // https://github.com/madyankin/postcss-modules#localsconvention
      localsConvention: 'camelCase',
    },
  },
});
```

### Component

With `vite-plugin-implicit-css-modules` you can write classes as is:

```jsx
<template>
  <p :class="{ 'red': true }">
    Am I red?
  </p>
  <p class="red bold">
    Red and bold
  </p>
</template>

<style module>
  .red {
    color: red;
  }
  .bold {
    font-weight: bold;
  }
</style>

```

and get result:

```html
<p class="red_1VyoJ-uZ">Am I red?</p>
<p class="red_1VyoJ-uZ bold_2dfrX-sE">Red and bold</p>
```

```css
.red_1VyoJ-uZ {
  color: red;
}
.bold_2dfrX-sE {
  font-weight: bold;
}
```

## Example

More [example](./example/)

## Thanks

Inspired by [vue-implicit-css-modules](https://github.com/AjiTae/vue-implicit-css-modules)

## License

[MIT](./LICENSE)
