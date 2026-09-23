export default (props: { children: React.ReactNode }) => {
    const { children } = props;
    return (
        <div className="" style={{ width: 200, height: 200, backgroundColor: "red" }}>
            {children}
        </div>
    );
}