import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { loading, error } = useFetch("http://localhost:8000/posts/");
  const navigate = useNavigate();

  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error. Please try again ....</p>;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      title: title,
      body: body,
      likes: 0,
    };

    await fetch("http://localhost:8000/posts", {
      method: "POST",
      body: JSON.stringify(doc),
      headers: { "Content-Type": "application/json" },
    });

    navigate("/")
    
  };


  return (
    <>
      <h1>Create a New Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Blog title"
        />
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          placeholder="Blog body"
        ></textarea>
        <button type="submit">Create</button>
      </form>

    </>
  );
};

export default Create;
