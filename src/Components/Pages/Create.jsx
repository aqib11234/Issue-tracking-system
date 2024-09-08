import { Form, Button, Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import { useState } from "react";
import supabase from "../Supa";
import { useNavigate } from "react-router-dom";

function Create() {
  const [priority, setPriority] = useState("Priority");
  const navigate = useNavigate();

  const handleDropdownChange = (eventKey, event) => {
    setPriority(event.target.textContent);
    console.log(event.target.textContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueTitle = document.getElementById("title").value;
    const cms = document.getElementById("cms").value;
    const email = document.getElementById("email").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const { error } = await supabase.from("issues").insert({
      email,
      cms,
      issue_title: issueTitle,
      issue_description: description,
      issue_category: category,
      issue_priority: priority,
    });

    if (error !== null) alert("Error: " + error.message);
    else alert("Issue Submitted Successfully!");
    navigate("/", { replace: true });
  };

  return (
    <Form className="p-5" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group as={Col} controlId="cms">
          <Form.Label>CMS</Form.Label>
          <Form.Control type="number" placeholder="Enter CMS ID" required />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Issue Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Issue Title" required />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="description">
          <Form.Label>Issue Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter Issue Title"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="category">
          <Form.Label>Issue Category</Form.Label>
          <Form.Control type="text" placeholder="Enter Category" required />
        </Form.Group>

        <Col className="d-flex align-items-end">
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
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default Create;
