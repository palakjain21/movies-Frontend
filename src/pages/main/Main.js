import { useEffect } from "react";
import axios from "axios";
import AddMovie from "../../components/addMovie/AddMovie";
import DisplayMovies from "../../components/displayMovies/DisplayMovies";
import Search from "../../components/search/Search";
import "./main.css";

function MainPage() {
  return (
    <div class="bg">
      <div className="navbar">
        <h1 class="white">MyMovies</h1>
        {/* <Search class="searchBox" /> */}
        <AddMovie />
      </div>
      <div className="tableStyle">
        <DisplayMovies />
      </div>
    </div>
  );
}

export default MainPage;
