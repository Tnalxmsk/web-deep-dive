# React Compound Pattern 실습
정리 문서 링크 https://glacier-filament-3e4.notion.site/Compound-2be2b94dd63180f1b16cfc8567a90f14?source=copy_link

## Step1 컴포넌트 구현하기
다음과 같이 사용할 수 있는 컴포넌트 구현을 목표
```tsx
<Step1 defaultValue="react">
  <Step1.List>
    <Step1.Trigger value="react">React</Step1.Trigger>
    <Step1.Trigger value="vue">Vue</Step1.Trigger>
  </Step1.List>

  <Step1.Content value="react">React Content</Step1.Content>
  <Step1.Content value="vue">Vue Content</Step1.Content>
</Step1>

```
