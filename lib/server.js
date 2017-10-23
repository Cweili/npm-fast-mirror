const urlParse = require('url-parse');
const Koa = require('koa');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const Router = require('koa-router');

const info = require('./info');
const meta = require('./meta');
const cache = require('./cache');

function route(app, options) {
  const router = new Router();

  router
    .all('/:name/:version.tgz', cache(options))
    .all('/:name/:version', meta.proxy(options))
    .all('/:name', meta.proxy(options))
    .all('/', info.basic(options))
    .all('*', meta.proxy(options));

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

module.exports = (options) => {
  const { port } = urlParse(options.url);

  const app = new Koa();

  app
    .use(async(ctx, next) => {
      console.info('request', ctx.ip.replace('::ffff:', ''), ctx.path);
      await next();
    })
    .use(conditional())
    .use(etag());

  route(app, options);

  app.listen(port, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info('npm-fast-mirror serve on', options.url);
  });
};
