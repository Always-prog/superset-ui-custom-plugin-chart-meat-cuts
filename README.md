## @superset-ui/plugin-chart-meat-cuts

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-meat-cuts.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-meat-cuts)

This plugin provides Meat Cuts for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import MeatCutsChartPlugin from '@superset-ui/plugin-chart-meat-cuts';

new MeatCutsChartPlugin()
  .configure({ key: 'meat-cuts' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-meat-cuts) for more details.

```js
<SuperChart
  chartType="meat-cuts"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── MeatCuts.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```
