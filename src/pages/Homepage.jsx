import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Homepage = () => {

  const { loading, error, data } = useFetch("http://localhost:8000/posts?_sort=likes&_order=desc")

  if(loading) return <p>Loading ....</p>
  if(error) return <p>Error. Please try again ....</p>

  console.log(data)

  return (
    <>
      <nav>
        <h1>All Blogs</h1>
        <Link to="./create">Add a new blog</Link>
      </nav>

      <form className="search">
        <input type="text" name="term" placeholder="Search term" />
      </form>

      <div className="blogs">
        {data.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p><small>{post.likes}</small></p>
            <p>{post.body.slice(0, 200)}</p>
            <Link to={`/details/${post.id}`}>Read More...</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
