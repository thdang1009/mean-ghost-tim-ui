# Angular

This is a personal blogs including some other features like:
- Blogs (write, read, manage blogs + file + tags + categories)
- About me pages
- To do list, Note, 
- Book management
- User management
- Dev's tool like: JSON beautifier, JSON & Excel, JavaScript's playground

## Get started

### Clone the repo

```shell
git clone https://github.com/thdang1009/mean-ghost-tim-ui
cd mean-ghost-tim-ui
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install -f
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `4500`.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode" .
* `npm run build` - runs the TypeScript compiler and asset copier once.
* `npm run debug` - runs with -c development.

These are the test-related scripts:

* `npm test` - builds the application and runs tests (both unit and functional) one time.
