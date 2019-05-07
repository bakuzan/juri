import { useEffect, useRef } from 'react';

function setItemOnScreenWatch(targetNode, callback, rootMargin = '0px') {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting && callback) {
        callback();
      }
    },
    {
      rootMargin
    }
  );

  if (targetNode) {
    observer.observe(targetNode);
  }

  return observer;
}

export function useProgressiveLoading(ref, onIntersect) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    let itemObserver = null;

    const observer = new MutationObserver((mutations) => {
      const record = mutations
        .filter((x) => x.addedNodes.length || x.removedNodes.length)
        .pop();

      if (record) {
        const source = record.addedNodes.length
          ? record.addedNodes
          : [record.previousSibling];

        const watched = Array.from(source).pop();

        itemObserver = setItemOnScreenWatch(
          watched,
          savedHandler.current,
          '50px'
        );
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
      observer && observer.disconnect();
      itemObserver && itemObserver.disconnect();
    };
  }, [ref]);
}
