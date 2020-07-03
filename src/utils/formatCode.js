import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babylon';

export default function formatCode(code) {
  const prettyOptions = {
    parser: 'babel',
    arrowParens: 'always',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    singleQuote: true,
    trailingComma: 'none',
    plugins: [babelParser]
  };

  try {
    const formatted = prettier.format(code, prettyOptions);
    return { isPretty: true, value: formatted };
  } catch (e) {
    return { isPretty: false, errorMessage: e.message };
  }
}
