import { useState, useEffect } from "react";

type wrapperProp = {
  mobileContent: JSX.Element;
  desktopContent: JSX.Element;
}

const MatchMediaWrapper = ({mobileContent, desktopContent}: wrapperProp) => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)
  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 500px)")
    setIsNarrowScreen(mediaWatcher.matches);

    function updateIsNarrowScreen(e: MediaQueryListEvent) {
      setIsNarrowScreen(e.matches);
    }

    mediaWatcher.addEventListener('change', updateIsNarrowScreen)
    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
    }

  },[])
  return isNarrowScreen ? mobileContent : desktopContent;
}

export default MatchMediaWrapper;

