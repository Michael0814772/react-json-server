import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState("");


  // for fetching post with ID
  const { loading, error, data } = useFetch(
    "https://my-json-database.herokuapp.com/posts/" + id
  );

  // for fetching relational data-- post related to comments
  const comment = useFetch("https://my-json-database.herokuapp.com/posts/" + id + "?_embed=comments")
  const comments = comment.data

  //for fetching only comments
  const postComment = useFetch("https://my-json-database.herokuapp.com/comments/")

  //for error handling and loading
  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error. Please try again ....</p>;

  console.log(postComment)


  //to delete a post
  const handleDelete = async () => {
    await fetch("https://my-json-database.herokuapp.com/posts/" + id, {
      method: "DELETE",
    });

    await fetch("https://my-json-database.herokuapp.com/comments/" + id, {
      method: "DELETE",
    })
    navigate("/")
    
  };

  //to submit a post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      details: details,
      postId: Number(id),
    };

    await fetch("https://my-json-database.herokuapp.com/comments", {
      method: "POST",
      body: JSON.stringify(doc),
      headers: { "Content-Type": "application/json" },
    });

    // navigate("/details/" + id)
    window.location.reload()
    
  };

  return (
    <>
      <h1>Details of Blog</h1>
      <div className="details">
        <h1>{data.title}</h1>
        <p>{data.body}</p>
      </div>

      {/* comments */}
      <div className="details">
        {comments && comments.comments.map(comment => (
          <p key={comment.id}>
            <small>{comment.details}</small>
            <small>{comment.postId}</small>
          </p>
        ))}
      </div>

      {/* for submitting a comment */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
        <button type="submit">Submit your comment</button>
      </form>

      {/* for deleting blog post */}
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
