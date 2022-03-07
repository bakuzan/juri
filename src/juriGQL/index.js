import { fetchSearch__testData, fetchLatest__testData } from '_testData';
import { getContentSearch, getContentLatest } from 'juriGQL/queries';
import alertService from 'utils/alertService';

const getRawQueryBody = (query) => query.loc.source.body;

export default async function juriQuery(payload) {
  const query = getRawQueryBody(payload.query);
  const queryData = { ...payload, query };
  const body = JSON.stringify(queryData);

  if (process.env.NODE_ENV === 'development') {
    switch (query) {
      case getRawQueryBody(getContentSearch):
        return await fetchSearch__testData(queryData);
      case getRawQueryBody(getContentLatest):
        return await fetchLatest__testData(queryData);
      default:
        break;
    }
  }

  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    });

    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];
      const { exception = { stacktrace: [] } } = error.extensions;

      alertService.showError(
        error.message,
        `Resolver: ${error.path} > ${error.extensions.code}\r\n\r\n
        ${(exception.stacktrace || []).join('\r\n')}`
      );
    }

    return result.data || {};
  } catch (error) {
    const errorDefaultMessage = 'Anonymous Error Message.';
    alertService.showError(
      'Server Error',
      `${error.message || errorDefaultMessage}\r\n${error.stack}`
    );

    console.error(error);
    return { data: null };
  }
}
