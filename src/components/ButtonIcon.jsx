function ButtonIcon(props) {
  const { type, children, onClick, className } = props;

  return (
    <button
      type={type}
      className={`${className} flex items-center justify-center space-x-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default ButtonIcon;
