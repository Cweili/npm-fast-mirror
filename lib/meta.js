const {
  readFile,
  writeFile
} = require('mz/fs');
const got = require('got');
const makeDir = require('make-dir');
const urlParse = require('url-parse');

function encodeScope(name) {
  return name.replace('/', '%2f');
}

async function getMeta(options, name, refresh) {
  const {
    dir,
    proxy,
    url
  } = options;
  const pkgDir = `${dir}/${name.substr(0, 2)}/${name}`;
  const pkgJson = `${pkgDir}/package.json`;
  const proxyPath = `${proxy}/${encodeScope(name)}`;
  let meta;
  try {
    meta = JSON.parse(await readFile(pkgJson, { encoding: 'utf8' }));
  } catch (err) {
  }
  if (meta && !refresh) {
    return meta;
  }
  const params = {
    json: true,
    timeout: 30000
  };
  if (meta && meta._etag) {
    params.headers = {
      'If-None-Match': meta._etag
    };
  }
  console.info('proxy', proxyPath);
  let res;
  let resError;
  try {
    res = await got(proxyPath, params);
  } catch (err)  {
    resError = err;
  }
  if (meta && (!res || res.statusCode == '304')) {
    return meta;
  }
  if (!res) {
    throw resError;
  }
  meta = res.body;
  meta._etag = res.headers.etag;
  Object.keys(meta.versions).forEach((version) => {
    meta.versions[version].dist._src = meta.versions[version].dist.tarball
      // fix taobao mirror
      .replace(/https?:\/\/registry\.npm\.taobao\.org\/(.+?)\/download\/(.+?)\.tgz/, 'http://cdn.npm.taobao.org/$1/-/$2.tgz');
    meta.versions[version].dist.tarball = `${url}/${encodeScope(name)}/${version}.tgz`
  });
  await makeDir(pkgDir);
  await writeFile(pkgJson, JSON.stringify(meta), { encoding: 'utf8' });
  return meta;
}

exports.proxy = (options) => {
  const {
    proxy,
    url
  } = options;

  return async(ctx) => {
    const path = proxy + ctx.path;
    const {
      name,
      version
    } = ctx.params;
    try {
      let res;
      if (name && !version) {
        res = await getMeta(options, name, true);
      } else {
        console.info('proxy', path);
        res = (await got(path, {
          json: true,
          timeout: 30000
        })).body;
        res.dist.tarball = `${url}/${encodeScope(name)}/${res.version}.tgz`
      }
      ctx.body = res;
    } catch (err) {
      console.error('proxy meta error', ctx.path, err);
      ctx.body = err;
      ctx.status = 500;
    }
  };
};

exports.getMeta = getMeta;
