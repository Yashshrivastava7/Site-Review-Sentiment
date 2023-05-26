import { useState } from "react";
import "./GetSentiment.css";
import Reviews from "./Reviews.tsx";
import toast from "react-hot-toast";

type Review = {
  sitename: string;
  review: string;
};

type Label = {
  sentiment: string;
  score: string;
};

function GetSentiment() {
  const [sitename, setSitename] = useState<string>("");
  const [label, setLabel] = useState<Label>();
  const [allReviews, setReviews] = useState<Review[]>([]);
  const [displayInfoToggle, setToggle] = useState<boolean>(false);
  function handleChange(e: any) {
    setSitename(e.target.value);
    setToggle(false);
  }
  async function handleSubmit() {
    if (sitename.length === 0) {
      toast.error("Please Enter the Site name");
      return;
    }
    const data = await fetch(`http://127.0.0.1:8000/reviews/${sitename}`, {
      method: "GET",
      mode: "cors",
    });
    if (data.status != 200) {
      console.log("Something went wrong!");
      return;
    }
    const result = await data.json();
    setReviews((_) =>
      result.map((obj: any): Review => {
        return {
          sitename: obj[0],
          review: obj[1],
        };
      })
    );
    setToggle(false);
    console.log(allReviews);
    console.log(result);
  }
  async function handleSentiment() {
    if (sitename.length === 0) {
      toast.error("Please Enter the Site name");
      return;
    }
    const data = await fetch(
      `http://127.0.0.1:8000/reviews/sentiment/${sitename}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const result: Label = await data.json();
    setLabel(result);
    setToggle((old) => !old);
    console.log(data);
  }
  return (
    <div className="GetSentiment">
      <h1>Get Sentiment</h1>
      <div className="input-section">
        <h3>Enter The Webiste</h3>
        <textarea
          rows={1}
          cols={30}
          placeholder="Sitename"
          onChange={handleChange}
        />
        <div className="button-holder">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleSentiment}>Get Sentiment</button>
        </div>
      </div>
      <div className="review-list">
        <h2>{sitename}</h2>
        {displayInfoToggle ? (
          <h2 className="score">
            {label?.sentiment + ": " + label?.score + "%"}
          </h2>
        ) : (
          <h2></h2>
        )}
        {allReviews.map((old: Review) => {
          return <Reviews {...old} />;
        })}
      </div>
    </div>
  );
}

export default GetSentiment;
