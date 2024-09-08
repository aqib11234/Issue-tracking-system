import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import supabase from "../Supa";
import { useNavigate } from "react-router-dom";

function IssuePage() {
  let { issue_id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      let { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("issue", issue_id);
      setComments(data);
    };
    const getIssue = async () => {
      let { data } = await supabase
        .from("issues")
        .select("*")
        .eq("id", issue_id);
      setIssue(data[0]);
    };
    getComments();
    getIssue();
  }, []);

  const postComment = async (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let cms = document.getElementById("cms").value;
    let comment = document.getElementById("comment").value;
    const { error } = await supabase
      .from("comments")
      .insert([{ name, cms, comment, issue: issue_id }]);
    if (error) {
      alert(error.message);
    } else {
      document.getElementById("name").value = "";
      document.getElementById("cms").value = "";
      document.getElementById("comment").value = "";
    }
  };

  const confirmDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );
    if (shouldDelete) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("issues").delete().eq("id", issue_id);
    navigate("/", { replace: true });
  };

  const handleUpdate = () => {
    navigate("/Update/" + issue_id);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const hideComments = () => {
    setShowComments(false);
  };

  return (
    <div style={{ height: "90vh" }}>
      {issue === null ? (
        <Spinner className="m-5" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card style={{ height: "100%" }}>
          <Card.Header className="text-center d-flex justify-content-between">
            <h3> {issue && issue["issue_title"]} </h3> {/* Add conditional check for issue */}
            <Button variant="secondary" onClick={toggleComments}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span>Category: {issue && issue["issue_category"]}</span> {/* Add conditional check for issue */}
                <span className="ms-3">Priority: {issue && issue["issue_priority"]}</span> {/* Add conditional check for issue */}
              </div>
              <div>Post Time: {issue && new Date(issue["post_time"]).toLocaleString()}</div> {/* Add conditional check for issue */}
            </div>
            <p>{issue && issue["issue_description"]}</p> {/* Add conditional check for issue */}
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span>CMS: {issue && issue["cms"]}</span> <br /> {/* Add conditional check for issue */}
                <span>Email: {issue && issue["email"]}</span> {/* Add conditional check for issue */}
              </div>
              <div>
                <Button variant="danger" className="me-2" onClick={confirmDelete}>
                  Delete
                </Button>
                <Button variant="warning" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            </div>
          </Card.Footer>
          {showComments && (
            <div
              style={{
                backgroundColor: "lightgray",
                width: "100%",
                maxHeight: "60vh",
                overflowY: "auto",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <Button
                  variant="secondary"
                  style={{ marginBottom: "10px" }}
                  onClick={hideComments}
                >
                  Back
                </Button>
                <p>New Comment</p>
                <Form onSubmit={postComment}>
                  <Form.Group className="mb-2" controlId="name">
                    <Form.Control
                      type="name"
                      placeholder="Enter Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="cms">
                    <Form.Control
                      type="number"
                      placeholder="Enter CMS ID"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="comment">
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Comment"
                      required
                    />
                  </Form.Group>
                  <Button type="submit" style={{ float: "right" }}>
                    Post
                  </Button>
                </Form>
              </div>
              <div>
                {comments &&
                  comments.map((comment, index) => (
                    <Card key={index} className="mb-2">
                      <Card.Header>
                        {comment.name}
                        <span className="ms-2">{comment.cms}</span>
                      </Card.Header>
                      <Card.Body>{comment.comment}</Card.Body>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default IssuePage;
