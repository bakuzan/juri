const extractSearchParam = (name, searchParam = '') =>
  searchParam
    .slice(1)
    .split('&')
    .reduce((p, c) => (c.includes(`${name}=`) ? c.replace(/^.+=/, '') : p), '');
