import { createContext, type ReactNode, useContext, useState } from "react";

type TabsValue = string;

type TabProps = {
  defaultValue: TabsValue;
  children: ReactNode;
}

type TabsContextValue = {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};


const TabRoot = ({ children, defaultValue }: TabProps) => {
  const [value, setValue] = useState<TabsValue>(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
};

type TabsListProps = {
  children: ReactNode;
}

const TabsList = ({ children }: TabsListProps) => {
  return <div>{children}</div>;
};

type TabsTriggerProps = {
  value: TabsValue;
  children: ReactNode;
}

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { value: activeValue, setValue } = useTabContext();
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

type TabContentProps = {
  value: TabsValue;
  children: ReactNode;
}

const TabContent = ({ value, children }: TabContentProps) => {
  const { value: activeValue } = useTabContext();
  const shown = value === activeValue;

  return shown ? <div>{children}</div> : null;
};

export const Tabs = Object.assign(TabRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabContent,
});
