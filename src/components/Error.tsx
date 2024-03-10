type ErrorType = {
  message: string | undefined;
};

const Error = ({ message }: ErrorType) => {
  return <p style={{ color: "red",fontSize:"12px" }}>{message}</p>;
};

export default Error;
