import { BaseLayout } from '@/layout/BaseLayout'


export const Error403 = () => {
  return (
    <BaseLayout title='error_403'>
      <div>
        <h1>403 エラー発生</h1>
        <p>APIキーを正しく入力してください。</p>
      </div>
    </BaseLayout>
  );
}
