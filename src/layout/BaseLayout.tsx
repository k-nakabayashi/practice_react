import { Head } from "@/components/Head";

type BaseLayoutProps = {
    children: React.ReactNode
    title: string
}

export const BaseLayout = ({children, title}: BaseLayoutProps) => {

    return (
    <> 
        <Head title={title}/>
        <header></header>
        <main>
            {children}
        </main>
        <footer></footer>
    </>
    );
}
