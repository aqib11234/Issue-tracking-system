import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import supabase from "../Supa";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  let { issue_id } = useParams();
  const [priority, setPriority] = useState("Priority");
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const getIssue = async () => {
      let { data } = await supabase
        .from("issues")
        .select("*")
        .eq("id", issue_id);
      setIssue(data[0]);
      document.getElementById("email").value = data[0].email;
      setPriority(data[0].issue_priority);
      document.getElementById("cms").value = data[0].cms;
      document.getElementById("title").value = data[0].issue_title;
      document.getElementById("category").value = data[0].issue_category;
      document.getElementById("description").value = data[0].issue_description;
    };
    getIssue();
  }, []);

  const handleDropdownChange = (eventKey, event) => {
    setPriority(event.target.textContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueTitle = document.getElementById("title").value;
    const cms = document.getElementById("cms").value;
    const email = document.getElementById("email").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const { error } = await supabase
      .from("issues")
      .update({
        email,
        cms,
        issue_title: issueTitle,
        issue_description: description,
        issue_category: category,
        issue_priority: priority,
      })
      .eq("id", issue_id);

    if (error !== null) alert("Error: " + error.message);
    else alert("Issue Updated Successfully!");
    navigate("/", { replace: true });
  };

  return (
    <Form className="p-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="cms">
        <Form.Label>CMS</Form.Label>
        <Form.Control type="number" placeholder="Enter CMS ID" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Issue Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Issue Title" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Issue Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter Issue Title"
          required
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Issue Category</Form.Label>
            <Form.Control type="text" placeholder="Enter Category" required />
          </Form.Group>
        </Col>
        <Col>
          <div className="d-flex justify-content-start">
            <DropdownButton
              style={{ marginTop: "5%" }}
              id="dropdown-basic-button"
              title={priority}
              onSelect={handleDropdownChange}
            >
              <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
              <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
              <Dropdown.Item eventKey="High">High</Dropdown.Item>
            </DropdownButton>
            <Button
              style={{ marginTop: "5%", marginLeft: "10px", width: "30vh" }}
              variant="warning"
              type="submit"
            >
              Update Issue
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default Update;
