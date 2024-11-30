import React from "react";
import { ListGroup } from "react-bootstrap";

const CommentsList = ({ comments }) => {
  // Ensure comments is always an array
  const safeComments = comments || [];

  return (
    <div className="mt-4">
      <h5>Comments</h5>
      {safeComments.length > 0 ? (
        <ListGroup variant="flush">
          {safeComments.map((comment, index) => (
            <ListGroup.Item key={index}>
              <strong>{comment.name}</strong>: {comment.comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentsList;
