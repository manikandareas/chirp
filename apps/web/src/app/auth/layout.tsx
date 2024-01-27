const AuthLayout: React.FC<React.PropsWithChildren> = (props) => {
    return (
        <main className="relative grid h-screen w-full bg-background  md:grid-cols-2 ">
            {props.children}
        </main>
    );
};

export default AuthLayout;
