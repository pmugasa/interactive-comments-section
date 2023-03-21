function Button(props) {
  const { onClick, type, children } = props;
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="bg-purple px-6 py-2 ml-auto rounded-md text-white font-bold"
      >
        {children}
      </button>
    </>
  );
}
export default Button;
