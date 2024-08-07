import React, { useEffect, useRef, useCallback } from "react";

const ScrollObserverSample = ({ onIntersect }) => {
  const observerRef = useRef();

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        onIntersect(); // setPage((prevPage) => prevPage + 1)
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  return <div ref={observerRef} />;
};

export default ScrollObserverSample;
