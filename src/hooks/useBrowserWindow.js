import { useState, useRef, useEffect, useCallback } from 'react';

const useBrowserWindow = (initialUrl) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [maybeBlocked, setMaybeBlocked] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleGo = () => {
    setIsLoading(true);
    setMaybeBlocked(false);
    setCurrentUrl(inputUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  const openExternally = useCallback((u) => {
    const target = u || currentUrl;
    try {
      window.open(target, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Failed to open externally, falling back to window.location.href:", error);
      window.location.href = target;
    }
  }, [currentUrl]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setMaybeBlocked(true);
        openExternally();
      }
    }, 2500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentUrl, isLoading, openExternally]);

  return {
    currentUrl,
    inputUrl,
    setInputUrl,
    isLoading,
    setIsLoading,
    maybeBlocked,
    setMaybeBlocked,
    iframeRef,
    handleGo,
    handleKeyDown,
    openExternally,
  };
};

export default useBrowserWindow;