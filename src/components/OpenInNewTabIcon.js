import React from 'react';

export default function OpenInNewTabIcon({ alt = 'open in new tab' }) {
  return (
    <img
      src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==`}
      alt={alt}
      title={alt}
      style={{ margin: `2px 5px` }}
    />
  );
}
