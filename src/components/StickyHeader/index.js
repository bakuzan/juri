import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useLayoutEffect, useRef } from 'react';

import './StickyHeader.scss';

function addEvent(event, cb) {
  window.addEventListener(event, cb, false);
  return () => window.removeEventListener(event, cb, false);
}

function StickyHeader({ children }) {
  const containerRef = useRef();
  const stickyRef = useRef();
  const hasRef = !!stickyRef.current;
  const [isFixed, setFixed] = useState(false);

  useLayoutEffect(() => {
    function handleFixedState() {
      const stickyRectHeight = stickyRef.current.offsetHeight;
      const container = containerRef.current;
      const containerHeight = container.offsetHeight;
      const containerRect = container.getBoundingClientRect();

      const pastStickyThreshold =
        containerHeight + containerRect.top - stickyRectHeight <= 0;

      if (pastStickyThreshold && !isFixed) {
        setFixed(true);
        return;
      }

      if (!pastStickyThreshold && isFixed) {
        setFixed(false);
        return;
      }
    }

    const detachScroll = addEvent('scroll', handleFixedState);
    const detachResize = addEvent('resize', handleFixedState);

    return () => {
      detachScroll();
      detachResize();
    };
  }, [hasRef, isFixed]);

  const isFnChildren = typeof children === 'function';

  return (
    <div ref={containerRef} className="sticky-header">
      <div
        ref={stickyRef}
        className={classNames('sticky-header__fixed', {
          'sticky-header__fixed--stuck': isFixed
        })}
      >
        {isFnChildren ? children(isFixed) : children}
      </div>
    </div>
  );
}

StickyHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};

export default StickyHeader;
