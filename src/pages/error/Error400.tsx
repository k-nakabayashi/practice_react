import { BaseLayout } from '@/layout/BaseLayout'


export const Error400 = () => {
  return (
    <BaseLayout title='error_400'>
      <div>
        <h1>400 エラー発生</h1>
        <p>お探しのページが見つかりませんでした。</p>
      </div>
    </BaseLayout>
  );
}
