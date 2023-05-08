import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const ModalBox = ({
  show,
  handleCheck,
  handleClose,
  handleComments,
  handleMovieSearch,
  handleRating,
  handleSubmit,
  handleWatchedDate,
  title,
  rating,
  watched,
  watchedDate,
  comments,
  suggestions,
  selectTitle,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
    </Modal>
  );
};

export default ModalBox;
