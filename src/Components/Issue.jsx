import { Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function Issue(props) {
  console.log(props.object);
  let {
    issue_title,
    post_time,
    issue_category,
    issue_priority,
    issue_description,
  } = props.object;

  const [variant, setVariant] = useState("success");

  useEffect(() => {
    if (issue_priority === "High") setVariant("danger");
    else if (issue_priority === "Medium") setVariant("warning");
    else setVariant("success");
  }, [issue_priority]);
  return (
    <Card
      bg={variant}
      text={variant === "warning" ? "dark" : "light"}
      className="mb-2"
    >
      <Card.Header className="d-flex justify-content-between">
        <h2> {issue_title}</h2>
        <span style={{ float: "right" }}>Posted: {post_time}</span>
      </Card.Header>
      <Card.Body>
        <Card.Title> {issue_category} </Card.Title>
        <Card.Text
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Description: {issue_description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Issue;
