import { BaseLayout } from '@/layout/BaseLayout'


export const Error404 = () => {

  console.log("asds")
  return (
    <BaseLayout title='error_404'>
      <div>
        <h1>404 - Not Found</h1>
        <p>お探しのページが見つかりませんでした。</p>
      </div>
    </BaseLayout>
  );
}
