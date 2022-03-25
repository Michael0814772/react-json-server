import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const { loading, error, data } = useFetch(
    "http://localhost:8000/posts/" + id
  );

  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error. Please try again ....</p>;


  const handleDelete = async () => {
    await fetch("http://localhost:8000/posts/" + id, {
      method: "DELETE",
    });
    navigate("/")
    
  };

  return (
    <>
      <h1>Details of Blog</h1>
      <div className="details">
        <h1>{data.title}</h1>
        <p>{data.body}</p>
      </div>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>

      <div className="comments"></div>
      {/* <form>
        <input type="text" name="commenting" />
        <button type="button">Comment</button>
      </form> */}
    </>
  );
};

export default Details;
