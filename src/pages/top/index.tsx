import { useContext } from 'react'
import { BaseLayout } from '@/layout/BaseLayout'
import { TopPageContext, TopPageProvider } from '@/pages/top/provider';
import { useNavigate } from 'react-router-dom';


export const TopPage = () => {

    // ==========================
    // 事前処理
    // ==========================

    const title = 'top';
    const navigate = useNavigate();

    const {
        app_key,
        handleChange,
    } = useContext(TopPageContext);
    
    // ==========================
    // コールバック
    // ==========================
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 遷移する
        navigate("/graph");
    }
    return (
        <BaseLayout
            title={title}
        >
            <TopPageProvider>
                <div className="container">
                    <form onSubmit={submit}>
                        <label htmlFor="app_key">
                            app_key: 
                            <input onChange={handleChange} id="app_key" type="texst" required/>
                        </label>
                        <button type="submit">送信</button>
                    </form>
                </div>
            </TopPageProvider>
        </BaseLayout>
    )
}