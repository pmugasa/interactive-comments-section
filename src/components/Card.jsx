function Card({ comment }) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm bg-white mt-4 rounded-md p-8">
        <div className="flex items-center space-x-4">
          <img src={comment.user.image.webp} className="h-10 w-10" />
          <p className="font-bold text-gray-600 text-md">
            {comment.user.username}
          </p>
          <p className="text-gray-400 font-semibold">{comment.createdAt}</p>
        </div>
        <p className="mt-4 font-semibold text-gray-400">{comment.content}</p>
        <div className="flex mt-4">
          <div className="flex space-x-4">
            <button>
              <img src="src\assets\icon-minus.svg" />
            </button>

            <span className="font-semibold text-purple">{comment.score}</span>
            <button>
              <img src="src\assets\icon-plus.svg" />
            </button>
          </div>
          <div className=" ml-auto">
            <button className="flex items-center justify-center space-x-2">
              <img src="src\assets\icon-reply.svg" />
              <span className="font-semibold text-purple">Reply</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
