import { Alert } from "bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchMovieSugestions } from "./../../api/api";
import { Autocomplete, TextField } from "@mui/material";
import { Typeahead } from "react-bootstrap-typeahead";
import "./addMovie.css";
import axios from "axios";
import ModalBox from "../modal/Modal";

function AddMovie() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [watched, setWatched] = useState(false);
  const [watchedDate, setWatchedDate] = useState("");
  const [comments, setComments] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const data = {
      title: title,
      ratings: rating,
      isWatched: watched,
      watchedDate: watchedDate,
      comment: comments,
    };
    console.log(data);
    try {
      const response = await axios.post(`http://localhost:8000/add-movie`, {
        data,
      });
      console.log(response.data.data);
      setShow(false);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleMovieSearch = async (value) => {
    // console.log(value);
    setSearchValue(value);
    setTitle(value);
    if (value.length > 4) {
      fetchMovieSugestions(value).then((res) => {
        setSuggestions(res.Search);
        console.log(res.Search);
      });
    }
  };
  const selectTitle = (value) => {
    console.log(value);
    setTitle(value);
    setSuggestions([]);
    // setSearchValue("");
  };

  const handleRating = (e) => {
    console.log(e.target.valueAsNumber);
    setRating(e.target.valueAsNumber);
  };
  const handleCheck = (e) => {
    console.log(e.target.checked);
    setWatched(e.target.checked);
  };
  const handleWatchedDate = (e) => {
    console.log(e.target.value);
    setWatchedDate(e.target.value);
  };
  const handleComments = (e) => {
    console.log(e.target.value);
    setComments(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Movie
      </Button>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>

              <Form.Control
                aria-label="Search title"
                id="autoComplete"
                onChange={(e) => handleMovieSearch(e.target.value)}
                placeholder="Enter title"
                value={title}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              {suggestions && suggestions.length > 0 ? (
                <div class="boxFrame">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.imdbID}
                      value={suggestion.Title}
                      class="box"
                      onClick={() => {
                        selectTitle(suggestion.Title);
                      }}
                    >
                      {suggestion.Title}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rating"
                max={5}
                min={0}
                onChange={handleRating}
              />
            </Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Watched?"
              onChange={handleCheck}
            />
            <Form.Group className="mb-3">
              <Form.Label>Watched date</Form.Label>
              <Form.Control type="date" onChange={handleWatchedDate} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter comments"
                onChange={handleComments}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <ModalBox
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title={title}
        rating={rating}
        watched={watched}
        watchedDate={watchedDate}
        comments={comments}
        handleMovieSearch={handleMovieSearch}
        suggestions={suggestions}
        selectTitle={selectTitle}
        handleRating={handleRating}
        handleCheck={handleCheck}
        handleWatchedDate={handleWatchedDate}
        handleComments={handleComments}
      />
    </>
  );
}

export default AddMovie;
