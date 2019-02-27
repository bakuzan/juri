import { useRef, useEffect } from 'react';

function useOnScreen(ref, callback, rootMargin = '0px') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          callback();
        }
      },
      {
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
}

export default function useProgressiveLoading(ref, onIntersect) {
  let watched = useRef();

  useEffect(() => {
    if (onIntersect) {
      const observer = new MutationObserver((mutations) => {
        const record = mutations
          .filter((x) => x.addedNodes.length || x.removedNodes.length)
          .pop();

        if (record) {
          const source = record.addedNodes.length
            ? record.addedNodes
            : [record.previousSibling];

          watched.current = Array.from(source).pop();
          useOnScreen(watched, onIntersect, '200px');
        }
      });

      if (ref.current) {
        observer.observe(ref.current, {
          attributes: false,
          childList: true,
          subtree: false
        });
      }

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return watched.current;
}
