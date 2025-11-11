export const { useState, mount } = (function () {
  const hooks = [];
  let hookIndex = 0;
  let root = null;

  function useState(initialState) {
    const i = hookIndex++;
    if (hooks[i] === undefined) hooks[i] = initialState;

    const setState = (newState) => {
      const prev = hooks[i];
      const next = typeof newState === 'function' ? newState(prev) : newState;
      hooks[i] = next;
      rerender();
    };

    return [hooks[i], setState];
  }

  function mount(component) {
    root = component;
    rerender();
  }

  function rerender() {
    hookIndex = 0;
    root && root();
  }

  return { useState, mount };
})();

function App() {
  const [count, setCount] = useState(0);
  console.log('render:', count);

  if (count < 3) {
    setCount((prev) => prev + 1);
  }
}

// 초기 렌더
mount(App);
