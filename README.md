# NPM Fast Mirror

[![npm][npm-version]][npm]
[![npm][npm-downloads]][npm]
[![npm][npm-license]][npm]
[![github][github-issues]][github]

Fast local npm registry mirror server.

## Install

Requires Node.js >= 7.6.0.

```
npm install npm-fast-mirror -g
```

## Usage

Start server:

```
npm-fast-mirror [options]
```

Then set `npm` to use this registry:

```
npm set registry http://127.0.0.1:9000
```

## Options

```
-V, --version      output the version number
-u, --url [url]    url to serve this server
-p, --proxy [url]  npm registry url to proxy
-d, --dir [path]   storage dir path
-h, --help         output usage information
```

[npm]: https://www.npmjs.com/package/npm-fast-mirror
[npm-version]: https://img.shields.io/npm/v/npm-fast-mirror.svg
[npm-downloads]: https://img.shields.io/npm/dt/npm-fast-mirror.svg
[npm-license]: https://img.shields.io/npm/l/npm-fast-mirror.svg

[github]: https://github.com/Cweili/npm-fast-mirror
[github-issues]: https://img.shields.io/github/issues/Cweili/npm-fast-mirror.svg