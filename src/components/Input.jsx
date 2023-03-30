function Input({ props }) {
  const { value, type } = props;
  return (
    <>
      <input
        type={type}
        //onChange={onChange}
        value={value}
        placeholder="Add your comment"
        className="border-2 border-gray-200 h-28 w-full rounded-lg p-4 font-rubik text-gray-400 focus:outline-purple"
      />
    </>
  );
}

export default Input;
