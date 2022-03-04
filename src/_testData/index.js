import generateUniqueId from 'ayaka/generateUniqueId';

import search from './searchTestData';
import latest from './latestTestData';

const withNewIds = (arr) => arr.map((x) => ({ ...x, id: generateUniqueId() }));

async function dummyApi(data) {
  console.log('Dummy Api Called :: with return data > ', data);
  return await new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}

export async function fetchLatest__testData() {
  return await dummyApi({ latest: withNewIds(latest) });
}

export async function fetchSearch__testData(params) {
  console.log('Search Mock > ', params);
  return await dummyApi({ search: withNewIds(search) });
}
