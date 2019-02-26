import alertService from 'utils/alertService';

export default async function juriQuery(payload) {
  const query = payload.query.loc.source.body; // Get the query raw string
  const body = JSON.stringify({ ...payload, query });

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
      alertService.showError(
        error.message,
        `${error.path} > ${
          error.extensions.code
        }\n${error.extensions.exception.stacktrace.join('\r\n')}`
      );
    }

    return result;
  } catch (error) {
    // TODO
    // Handle failure errors with alert to user
    console.error(error);
    return { data: null };
  }
}
