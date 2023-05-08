import { Form, Button } from "react-bootstrap";
import "./search.css";
function Search() {
  return (
    <Form className="d-flex searchBox">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 searchStyle"
        aria-label="Search"
      />
      <Button className="ms-2">Search</Button>
    </Form>
  );
}

export default Search;
