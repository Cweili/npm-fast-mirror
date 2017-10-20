# NPM Fast Mirror

Local fast npm registry mirror server.

[![npm](https://nodei.co/npm/npm-fast-mirror.png?downloads=true&stars=true)](https://www.npmjs.com/package/npm-fast-mirror)

## Install

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
