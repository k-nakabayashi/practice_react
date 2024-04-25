import { BaseLayout } from '@/layout/BaseLayout';


export const Error429 = () => {
  return (
    <BaseLayout title='error_429'>
      <div>
        <h1>429エラー</h1>
        <p>使用が制限されてます。時間を空けてご使用ください。</p>
      </div>
    </BaseLayout>
  );
}
