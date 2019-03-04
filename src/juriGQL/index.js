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
        `Resolver: ${error.path} > ${
          error.extensions.code
        }\n\n${error.extensions.exception.stacktrace.join('\r\n')}`
      );
    }

    return result;
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
