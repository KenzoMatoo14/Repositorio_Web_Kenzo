import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h5>Comments</h5>
      <ul className="list-unstyled">
        {comments && comments.map((comment, index) => (
          <li key={index} className="mb-3">
            <strong>{comment.name}</strong>: {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
