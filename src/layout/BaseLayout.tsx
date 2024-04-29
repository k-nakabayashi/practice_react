
type BaseLayoutProps = {
    children: React.ReactNode
}

export const BaseLayout = ({children}: BaseLayoutProps) => {

    return (
    <> 
        <header></header>
        <main>
            {children}
        </main>
        <footer></footer>
    </>
    );
}
