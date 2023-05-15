import { useState } from "react";
import "./App.css";
import AddReview from "./AddReview";
import GetSentiment from "./GetSentiment";

function App() {
  const [page, togglePage] = useState<boolean>(true);
  return (
    <>
      <div className="container">
        <h1>Hello there!</h1>
        <label className="switch">
          <input type="checkbox" onClick={() => togglePage((page) => !page)} />
          <span className="slider"></span>
        </label>
        {page === true ? <AddReview /> : <GetSentiment />}
      </div>
    </>
  );
}

export default App;
