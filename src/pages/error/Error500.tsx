import { BaseLayout } from '@/layout/BaseLayout';

export const Error500 = () => {
  return (
    <BaseLayout title='error_429'>
      <div>
        <h1>500 エラー発生</h1>
        <p>予期せぬエラーが発生しました。</p>
      </div>
    </BaseLayout>
  );
}
