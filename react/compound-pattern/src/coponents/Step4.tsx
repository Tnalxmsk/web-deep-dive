import { createContext, type ReactNode, useContext, useState } from "react";

type TabsValue = string;

type TabsProps = {
  value?: TabsValue;
  defaultValue?: TabsValue;
  onValueChange?: (value: TabsValue) => void;
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

/**
 * 4단계 - value, defaultValue (제어형/비제어형) 지원하기
 * 이전에는 항상 defaultValue로만 상태를 관리하고 있음
 * 외부에서 value를 직접 관리하는 제어형 패턴도 자주 쓰니 같이 지원
 *
 * 차이
 * - 제어형: value prop으로 상태를 직접 제어, onChange 콜백으로 상태 변경 통지
 * - 비제어형: defaultValue prop으로 초기 상태 설정, 내부 상태로 관리
 *
 * 여기서는 제어형/비제어형을 모두 지원하는 Tabs 컴포넌트를 구현
 * TabsRoot 컴포넌트가 value, defaultValue, onValueChange props를 모두 받도록 변경
 */
export const TabsRoot = ({ value: controlledValue, defaultValue, onValueChange, children }: TabsProps) => {
  // 제어형인지 비제어형인지 판단
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<TabsValue>(defaultValue);

  // 실제로 사용할 값 결정
  const value = isControlled ? controlledValue : uncontrolledValue;

  // 값 변경 함수
  const setValue = (newValue: TabsValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
};

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
 *  컴파운드 묶기
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
