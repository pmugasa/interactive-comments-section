import Reply from "./Reply";
import ButtonIcon from "./ButtonIcon";
import Button from "./Button";

function Card({
  comment,
  currentUser,
  deleteComment,
  editingComment,
  updateComment,
  handleEditComment,
  setEditingComment,
  getTimeAgo,
}) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm font-rubik text-sm bg-white mt-4 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <img src={comment.user.image.webp} className="h-6 w-6" />
          <p className="font-bold  text-gray-600 ">{comment.user.username}</p>

          <p className="text-gray-400">{getTimeAgo(comment.createdAt)}</p>
        </div>

        {editingComment && editingComment.id === comment.id ? (
          <div>
            <input
              value={editingComment.content}
              onChange={(e) =>
                setEditingComment({
                  ...editingComment,
                  content: e.target.value,
                })
              }
              type="text"
              className=" text-base mt-4 border-2 border-gray-200 h-28 w-full rounded-lg p-2 font-rubik text-gray-400 focus:outline-purple"
            />
            <Button onClick={updateComment} className="mt-2">
              Update
            </Button>
          </div>
        ) : (
          <p className="mt-4  text-gray-400 text-base">{comment.content}</p>
        )}

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
            {comment.user.username === currentUser.username ? (
              <div className="flex space-x-4 text-base">
                <ButtonIcon
                  onClick={() => deleteComment(comment.id)}
                  className="text-softRed"
                >
                  <img src="src\assets\icon-delete.svg" />
                  <span className="font-semibold ">Delete</span>
                </ButtonIcon>
                <ButtonIcon
                  disabled={editingComment}
                  className=" text-purple"
                  onClick={() => handleEditComment(comment)}
                >
                  <img src="src\assets\icon-edit.svg" />
                  <span className="font-semibold  ">Edit</span>
                </ButtonIcon>
              </div>
            ) : (
              <ButtonIcon>
                <img src="src\assets\icon-reply.svg" />
                <span className="font-semibold text-purple text-base">
                  Reply
                </span>
              </ButtonIcon>
            )}
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
