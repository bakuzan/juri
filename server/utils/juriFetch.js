// const got = require('got');
// const fetch = require('node-fetch');
// const { catchCloudflare } = require('@ctrl/cloudflare');
// const { CookieJar } = require('tough-cookie');

// async function cloudflareBypass(url, reqOpts) {
//   const cookieJar = new CookieJar();
//   const options = {
//     url,
//     cookieJar,
//     retry: 0,
//     ...reqOpts
//   };

//   let response = null;

//   try {
//     response = await got(options);
//   } catch (error) {
//     response = await catchCloudflare(error, options);
//   }

//   return response;
// }

module.exports = async function juriFetch(opts, reqOpts) {
  const fetch = (...args) =>
    import('node-fetch').then(({ default: nodeFetch }) => nodeFetch(...args));
  return await fetch(opts.url, { method: 'GET', ...reqOpts });
  // const bypassCloudflare = opts.cloudflare || false;

  // if (!bypassCloudflare) {
  //   return await fetch(opts.url, { method: 'GET', ...reqOpts });
  // } else {
  //   return await cloudflareBypass(opts.url, reqOpts);
  // }
};
