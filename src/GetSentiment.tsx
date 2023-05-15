import { useState } from "react";
import "./GetSentiment.css";

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
  return (
    <div className="GetSentiment">
      <h1>Get Sentiment</h1>
      <div className="input-section">
        <h3>Enter The Webiste</h3>
        <input type="text" placeholder="Sitename" onChange={handleChange} />
        <button onClick={handleClick}>Submit</button>
      </div>
      <div className="review-list">
        <h2>{label}</h2>
        {allReviews.map((old: Review) => {
          return <p>{old.sitename}</p>;
        })}
      </div>
    </div>
  );
}

export default GetSentiment;
