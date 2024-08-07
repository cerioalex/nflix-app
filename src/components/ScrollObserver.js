import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useCallback } from "react";

const ScrollObserver = ({ onIntersect, hasMore, loading }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !loading) {
        onIntersect();
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore, loading, onIntersect]);

  return (
    <div
      ref={elementRef}
      style={{
        flexShrink: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <CircularProgress />}
    </div>
  );
};

export default ScrollObserver;
