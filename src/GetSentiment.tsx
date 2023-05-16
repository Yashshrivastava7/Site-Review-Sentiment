import { useState } from "react";
import "./GetSentiment.css";
import Reviews from "./Reviews.tsx";

type Review = {
  sitename: string;
  review: string;
};
function GetSentiment() {
  const [sitename, setSitename] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [allReviews, setReviews] = useState<Review[]>([]);
  function handleChange(e: any) {
    setSitename(e.target.value);
    setLabel(e.target.value);
  }
  async function handleClick() {
    const data = await fetch(`http://127.0.0.1:8000/reviews/${sitename}`, {
      method: "GET",
      mode: "cors",
    });
    if (data.status != 200) {
      console.log("Something went wrong!");
      return;
    }
    const result = await data.json();
    setReviews((old) =>
      result.map((obj: any): Review => {
        return {
          sitename: obj[0],
          review: obj[1],
        };
      })
    );
    console.log(allReviews);
    console.log(result);
  }
  async function handleSentiment() {
    const data = await fetch(
      `http://127.0.0.1:8000/reviews/sentiment/${sitename}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    console.log(data);
  }
  return (
    <div className="GetSentiment">
      <h1>Get Sentiment</h1>
      <div className="input-section">
        <h3>Enter The Webiste</h3>
        <input type="text" placeholder="Sitename" onChange={handleChange} />
        <div className="button-holder">
          <button onClick={handleClick}>Submit</button>
          <button onClick={handleSentiment}>Get Sentiment</button>
        </div>
      </div>
      <div className="review-list">
        <h2>{sitename}</h2>
        {allReviews.map((old: Review) => {
          return <Reviews {...old} />;
        })}
      </div>
    </div>
  );
}

export default GetSentiment;
