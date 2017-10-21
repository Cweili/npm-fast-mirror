const pkg = require('../package.json');

exports.basic = (options) => (ctx) => {
  ctx.body = {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    proxy: options.proxy,
    url: options.url
  };
};
