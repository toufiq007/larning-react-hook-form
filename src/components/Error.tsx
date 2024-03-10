
type ErrorType = {
    message:string | undefined
}

const Error = ({message}:ErrorType) => {
    return (
        <p>{message}</p>
    );
};

export default Error;