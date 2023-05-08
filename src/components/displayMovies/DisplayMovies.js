import { Table, Form } from "react-bootstrap";
import "./DisplayMovies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import deleteButton from "../../assets/delete.png";
import edit from "../../assets/edit.png";
import AddMovie from "../addMovie/AddMovie";
import ModalBox from "../modal/Modal";
import UpdateMovie from "../updateMovie/UpdateMovie";

function DisplayMovies() {
  const [filter, setFilter] = useState("all");
  const [movies, setMovies] = useState([]);
  // fetch movies from database

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post("http://localhost:8000/get-movies", {
          filter,
        });
        let moviesResponse;

        if (response?.data) {
          moviesResponse = response?.data?.map((movie) => {
            return {
              id: movie?.id,
              title: movie?.title?.title[0]?.text?.content,
              ratings: movie?.ratings?.select?.name,
              isWatched: movie?.isWatched?.checkbox,
              watchedDate: movie?.watchedDate?.date?.start,
              comment: movie?.comment?.rich_text[0]?.text?.content,
            };
          });
        }
        console.log(moviesResponse);
        setMovies(moviesResponse);
        return moviesResponse;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    fetchMovies();
  }, []);

  const handleSelect = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
    const fetchMovies = async () => {
      try {
        const response = await axios.post("http://localhost:8000/get-movies", {
          filter,
        });
        let moviesResponse;

        if (response?.data) {
          moviesResponse = response?.data?.map((movie) => {
            return {
              id: movie?.id,
              title: movie?.title?.title[0]?.text?.content,
              ratings: movie?.ratings?.select?.name,
              isWatched: movie?.isWatched?.checkbox,
              watchedDate: movie?.watchedDate?.date?.start,
              comment: movie?.comment?.rich_text[0]?.text?.content,
            };
          });
        }
        console.log(moviesResponse);
        setMovies(moviesResponse);
        return moviesResponse;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    fetchMovies();
  };
  const deleteMovie = async (id) => {
    try {
      const response = await axios.post("http://localhost:8000/delete-movie", {
        movieId: id,
      });
      console.log(response.data);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div class="displayTable">
      <Table striped bordered className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Ratings</th>
            <th>Watched</th>
            <th>Watched date</th>
            <th>Comments</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            return (
              <tr>
                <td contentEditable="true">{movie.title}</td>
                <td contentEditable="true">{movie.ratings}</td>
                <td contentEditable="true">{movie.isWatched ? "Yes" : "No"}</td>
                <td contentEditable="true">{movie.watchedDate}</td>
                <td contentEditable="true">{movie.comment}</td>
                <td>
                  <img
                    src={deleteButton}
                    className="icons"
                    onClick={() => {
                      deleteMovie(movie);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Form.Select
        aria-label="Default select example"
        onClick={handleSelect}
        class="filter"
      >
        <option value="all">All</option>
        <option value="watched">Watched</option>
        <option value="notWatched">Not Watched</option>
      </Form.Select>
    </div>
  );
}

export default DisplayMovies;
