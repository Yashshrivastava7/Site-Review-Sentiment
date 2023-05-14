import { useState } from "react";
import "./AddReview.css";

type Review = {
  sitename: string;
  review: string;
};

function AddReview() {
  const [review, setReview] = useState<string>("");
  const [sitename, setSitename] = useState<string>("");
  function handleSitename(e: any) {
    setSitename(e.target.value);
  }
  function handleReview(e: any) {
    setReview(e.target.value);
  }
  async function handleClick() {
    const data: Review = {
      sitename: sitename,
      review: review,
    };
    console.log(data);
    const result = await fetch("http://127.0.0.1:8000/reviews", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status != 200) {
      console.log("Something went wrong");
    }
    console.log(data);
  }
  return (
    <>
      <div className="AddReview">
        <h1>Add Review</h1>
        <textarea
          rows={1}
          cols={50}
          className="upperInput"
          placeholder="Sitename"
          onChange={handleSitename}
        />
        <textarea
          rows={10}
          cols={50}
          placeholder="Review"
          onChange={handleReview}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
    </>
  );
}

export default AddReview;
