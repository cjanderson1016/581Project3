

const Alert = () => {
  const showAlert = {
    message: "Some message",
    type: "success",
  };



  return <div className="alert">{showAlert.message}</div>;
};

export default Alert;
