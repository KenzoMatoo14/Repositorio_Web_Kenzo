import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const CommentForm = ({ name, comment, setName, setComment, handleSubmit }) => (
  <Container className="mt-4">
    <h4>Leave a Comment</h4>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Your Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="comment">Your Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  </Container>
);

export default CommentForm;
