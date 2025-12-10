import { createContext, type ReactNode, useContext, useState } from "react";

type TabsValue = string;

type TabsProps = {
  defaultValue: TabsValue;
  children: ReactNode;
}

type TabsContextValue = {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};

export const TabsRoot = ({ defaultValue, children }: TabsProps) => {
  const [value, setValue] = useState<TabsValue>(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
};

/**
 * 3단계 - 컴파운드 컴포넌트 구현
 * Tabs.List, Tabs.Trigger, Tabs.Content 컴포넌트를 구현
 * Tabs.List - 단순 래퍼로 레이아웃용
 * Tabs.Trigger - 클릭하면 setValue(value) 호출하는 버튼
 * Tabs.Content - activeValue === value 일 때 children 렌더
 */

/**
 *  Tabs.List
 */
type TabsListProps = {
  children: ReactNode;
}

const TabsList = ({ children }: TabsListProps) => {
  return <div>{children}</div>;
};

/**
 * Tabs.Trigger
 */
type TabsTriggerProps = {
  value: TabsValue;
  children: ReactNode;
}

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { value: activeValue, setValue } = useTabsContext();
  const selected = value === activeValue;

  return (
    <button
      onClick={() => setValue(value)}
      style={{ fontWeight: selected ? 'bold' : 'normal' }}
    >
      {children}
    </button>
  );
};

/**
 * Tabs.Content
 */
type TabsContentProps = {
  value: TabsValue;
  children: ReactNode;
}

const TabsContent = ({ value, children }: TabsContentProps) => {
  const { value: activeValue } = useTabsContext();
  const shown = value === activeValue;

  return shown ? <div>{children}</div> : null;
};

/**
 *  마지막으로 컴파운드 네임스페이스로 묶기
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
