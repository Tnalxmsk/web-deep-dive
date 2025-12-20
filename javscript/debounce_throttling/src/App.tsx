import { Tabs } from "./components/tab/Tab.tsx";
import Search from "./components/search/Search.tsx";
import ScrollTracker from "./components/scroll/ScrollTracker.tsx";

function App() {

  return (
    <main>
      <header>
        <h1>Debounce & Throttling</h1>
      </header>
      <Tabs defaultValue="debounce">
        <Tabs.List>
          <Tabs.Trigger value="debounce">Debounce</Tabs.Trigger>
          <Tabs.Trigger value="throttling">Throttling</Tabs.Trigger>
        </Tabs.List>

        {/* 디바운스 실습 */}
        <Tabs.Content value="debounce">
          <Search />
        </Tabs.Content>

        {/* 스로틀링 실습 */}
        <Tabs.Content value="throttling">
          <ScrollTracker />
        </Tabs.Content>
      </Tabs>
    </main>
  );
}

export default App;
