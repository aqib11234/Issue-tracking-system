import Issue from "../Issue";
import { Nav, Card, Row, Col } from "react-bootstrap";
import supabase from "../Supa";
import React, { useState, useEffect } from "react";

function Home() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getIssues = async () => {
      let { data, error } = await supabase.from("issues").select();
      setIssues(data);
      console.log(data);
    };
    getIssues();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "#f8f9fa", padding: "20px" }}>
      <Row xs={1} md={2} lg={3} xl={4} gap={3}>
        {issues === null ? (
          <h6>Loading</h6>
        ) : (
          issues.map((issue) => (
            <Col key={issue.id}>
              <Card className="h-100">
                <Card.Body>
                  <Nav.Link href={"/Issue/" + issue.id}>
                    <Issue object={issue} />
                  </Nav.Link>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {new Date(issue.post_time).toLocaleDateString([], {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default Home;
