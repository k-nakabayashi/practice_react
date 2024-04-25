import { BaseLayout } from '@/layout/BaseLayout';

export const Error500 = () => {
  return (
    <BaseLayout title='error_429'>
      <div>
        <h1>500 - Not Found</h1>
        <p>予期せぬエラーが発生しました。</p>
      </div>
    </BaseLayout>
  );
}
