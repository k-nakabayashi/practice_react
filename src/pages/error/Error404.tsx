import { BaseLayout } from '@/layout/BaseLayout'


export const Error404 = () => {

  return (
    <BaseLayout title='error_404'>
      <div>
        <h1>404 エラー発生</h1>
        <p>お探しのページが見つかりませんでした。</p>
      </div>
    </BaseLayout>
  );
}
