import Reply from "./Reply";

function Card({ comment, currentUser }) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm font-rubik text-sm bg-white mt-4 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <img src={comment.user.image.webp} className="h-6 w-6" />
          <p className="font-bold  text-gray-600 ">{comment.user.username}</p>

          <p className="text-gray-400">{comment.createdAt}</p>
        </div>
        <p className="mt-4  text-gray-400 text-base">{comment.content}</p>
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
      <div className="pl-4 mt-4 border-l-2 border-gray-150">
        {comment.replies.length > 0
          ? comment.replies.map((reply) => (
              <Reply key={reply.id} reply={reply} currentUser={currentUser} />
            ))
          : null}{" "}
      </div>
    </>
  );
}

export default Card;
