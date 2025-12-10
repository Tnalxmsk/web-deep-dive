import { type ReactNode, useState } from "react";

type TabsValue = string;

type TabsRootProps = {
  defaultValue: TabsValue;
  children: ReactNode;
}
/**
 * 1단계 - Tabs의 뼈대 만들기
 * 아직 List/Trigger/Content 같은 컴파운드는 없음
 * 일단 defaultValue로 내부 상태를 갖고 있는 최소 버전 구현
 */
const TabsRoot = ({ defaultValue, children }: TabsRootProps) => {
  const [value, setValue] = useState<TabsValue>(defaultValue);

  return (
    <div>
      {children}
    </div>
  );
};
