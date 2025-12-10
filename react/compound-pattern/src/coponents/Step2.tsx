import { createContext, type ReactNode, useContext, useState } from "react";

type TabsValue = string;

type TabsRootProps = {
  defaultValue: TabsValue;
  children: ReactNode;
}

/**
 * 2단계 - Context 준비하기
 * Tabs 내부 상태를 하위 컴포넌트들이 암묵적으로 사용할 수 있게 Context를 정의
 */
type TabsContextValue = {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  // 안전장치: Tabs 컴포넌트 외부에서 훅을 사용하는 경우 에러 발생
  // Tabs 컴포넌트 외부에서 사용하지 못하게 하는 이유는 Tabs 컴포넌트 내부에서만 의미가 있는 상태이기 때문
  if (!context) {
    throw new Error('Tabs 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};

/**
 * 정의한 Context를 Tabs 컴포넌트에서 제공
 */
const TabsRoot = ({ defaultValue, children }: TabsRootProps) => {
  const [value, setValue] = useState<TabsValue>(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
};
