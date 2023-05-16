import "./Reviews.css";

type Review = {
  sitename: string;
  review: string;
};

function Reviews(props: Review) {
  return (
    <div>
      <h3>{props.review}</h3>
    </div>
  );
}

export default Reviews;
