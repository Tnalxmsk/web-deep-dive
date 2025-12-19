import { Tabs } from "./coponents/Step4.tsx";
import { useState } from "react";

function App() {
  const [tab, setTab] = useState('react');

  return (
    // 3단계 Tabs 컴포넌트 사용
    /*<Tabs defaultValue="react">
      <Tabs.List>
        <Tabs.Trigger value="react">React</Tabs.Trigger>
        <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="react">React Content</Tabs.Content>
      <Tabs.Content value="vue">Vue Content</Tabs.Content>
    </Tabs>*/

    // 4단계 제어형 Tabs 컴포넌트 사용
    // 제어형 언제 써?
    // -> 탭 클릭 시 URL 쿼리 파라미터가 바뀌어야 하는 경우 (SearchParams로 tab을 가져옴)
    // const tab = searchParams.get('tab') ?? 'react';
    // <Tabs value={tab} ...> 브라우저 뒤로, 앞으로가기 해도 탭 동기화!
    // -> 상위 컴포넌트에서 Tabsㅇ의 상태 관찰 혹은 기록이 필요할 때
    // -> 서버 컴포넌트/SSR 환경에서 초깃값을 상위에서 결정해야 할 때
    //
    // 그럼 비제어형은 언제?
    // -> Tabs 자체가 독립적인 UI 컴포넌트일 때
    // -> 다른 상태와 연동될 필요가 없을 때, 단순히 Tabs 안에서만 상태가 관리되면 될 때

    // => 제어형은 복잡도가 올라가기 때문에 필요할 때만 쓰자!
    <Tabs value={tab} onValueChange={setTab}>
      {/*해당 버튼을 누르면 항상 vue 탭으로 바뀜*/}
      <button onClick={() => setTab('vue')}>외부에서 vue로 바꾸기</button>

      <Tabs value={tab} onValueChange={setTab}>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
      </Tabs>
    </Tabs>
  );
}

export default App;
