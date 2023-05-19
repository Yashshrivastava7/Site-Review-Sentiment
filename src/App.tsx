import { useState } from "react";
import "./App.css";
import AddReview from "./AddReview";
import GetSentiment from "./GetSentiment";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [page, togglePage] = useState<boolean>(true);
  return (
    <>
      <div className="container">
        <h1>Major Project!</h1>
        <label className="switch">
          <input type="checkbox" onClick={() => togglePage((page) => !page)} />
          <span className="slider"></span>
        </label>
        {page === true ? <AddReview /> : <GetSentiment />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
