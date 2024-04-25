import {BaseLayout} from '@/layout/BaseLayout';

export const GraphPage = () => {

    // ==========================
    // 事前処理
    // ==========================

    const title = 'graph';

    // ==========================
    // コールバック
    // ==========================

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <BaseLayout
            title={title}
        >
            <div className="container">
                <form onSubmit={submit}>
                    <button type="submit">送信</button>
                </form>
            </div>
        </BaseLayout>
    )
}