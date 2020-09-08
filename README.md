# \<my-component>

## Installation

```bash
npm i my-component
```

```bash
yarn install
```

## Usage

```html
<script type="module">
	import "my-component/my-component.js";
</script>

<my-component></my-component>
```

```html
<script type="module">
	import "my-component/my-component.js";
</script>

<my-component .title="My title"></my-component>
```

## Testing with Karma

To run the suite of karma tests, run

```bash
npm run test
```

```bash
yarn test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

```bash
yarn test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
