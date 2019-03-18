import search from './searchTestData';
import latest from './latestTestData';

async function dummyApi(data) {
  return await new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}

export async function fetchLatest__testData() {
  return await dummyApi({ latest });
}

export async function fetchSearch__testData() {
  return await dummyApi({ search });
}
