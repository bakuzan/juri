import compose from './compose';

const parseSearchParamValue = compose(
  function castStringToBool(val) {
    if (val === 'true') {
      return true;
    } else if (val === 'false') {
      return false;
    }

    return val;
  },
  function parseIfInt(val) {
    const maybeInt = parseInt(val, 10);
    return maybeInt === 0 || !!maybeInt ? maybeInt : val;
  },
  decodeURIComponent
);

const constructObjectFromSearchParams = (searchParam = '') =>
  searchParam
    .slice(1)
    .split('&')
    .reduce((p, c) => {
      const [key, raw] = c.split('=');
      const value = parseSearchParamValue(raw);
      return { ...p, [key]: value };
    }, {});

export default constructObjectFromSearchParams;
