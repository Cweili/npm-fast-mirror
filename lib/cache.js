const crypto = require('crypto');
const {
  createReadStream,
  createWriteStream,
  readFile,
  stat,
  unlink
} = require('mz/fs');
const got = require('got');

const {
  getMeta
} = require('./meta');

const {
  getPkgDir
} = require('./utils');

async function checksum(path, shasum) {
  try {
    const buf = await readFile(path);
    if (shasum != crypto.createHash('sha1').update(buf).digest('hex')) {
      await unlink(path);
    }
  } catch (err) {
    console.error('cache integrity checksum error', path, err);
  }
}

module.exports = (options) => {
  const { dir } = options;

  return async(ctx) => {
    const {
      name,
      version
    } = ctx.params;
    const path = `${dir}${getPkgDir(name)}/${version}.tgz`;
    let fstat;
    try {
      fstat = await stat(path);
    } catch (err) {
      err;
    }
    if (fstat && fstat.isFile() && fstat.size > 0) {
      console.log('hit', path);
      ctx.body = createReadStream(path);
    } else {
      try {
        console.log('cache', path);
        const meta = await getMeta(options, name);
        try {
          fstat && await unlink(path);
        } catch (e) {
          e;
        }
        const ws = createWriteStream(path, {
          flags: 'wx'
        });
        const { dist } = meta.versions[version].dist;
        const rs = got.stream(dist._src);
        rs.pipe(ws);
        ctx.body = rs;
        ws.on('close', () => {
          checksum(path, dist.shasum);
        });
        ws.on('error', (err) => {
          console.error('cache write error', path, err);
          checksum(path, dist.shasum);
        });
        rs.on('error', (err) => {
          console.error('cache source error', path, err);
          checksum(path, dist.shasum);
        });
      } catch (err) {
        console.error('cache error', path, err);
        ctx.body = err;
        ctx.status = 500;
      }
    }
  };
};
