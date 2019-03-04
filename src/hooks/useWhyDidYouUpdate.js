import { useRef, useEffect } from 'react';

// For Development logging
export function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log(
          '%c [why-did-you-update]',
          'color: #036363',
          name,
          changesObj
        );
      }
    }

    // update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
