import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchMovieSugestions } from "./../../api/api";
import axios from "axios";
import ModalBox from "../modal/Modal";

function UpdateMovie({ movie }) {
  console.log(movie, "movie");

  const [show, setShow] = useState(true);
  const [title, setTitle] = useState(movie.title);
  const [rating, setRating] = useState(movie.rating);
  const [watched, setWatched] = useState(movie.isWatched);
  const [watchedDate, setWatchedDate] = useState(movie.watchedDate);
  const [comments, setComments] = useState(movie.comment);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    console.log(movie);
  }, []);

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

export default UpdateMovie;
