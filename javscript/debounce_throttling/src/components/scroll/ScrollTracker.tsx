import { useEffect, useState } from "react";

const ScrollTracker = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setY(window.scrollY);
      console.log('스크롤: ', window.scrollY);
    };

    /*const onScroll = throttle(() => {
      setY(window.scrollY);
      console.log('스크롤: ', window.scrollY);
    }, 200);*/

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ height: '200vh', paddingTop: '20px' }}>
      <h2>현재 스크롤 y: {y}px</h2>
      <p>스크롤 내리삼</p>
    </div>
  );
};

export default ScrollTracker;
