import React from "react";
import useFetch from "../hooks/useFetch";
import { useForm } from "react-hook-form";

const Create = () => {
  const { register, handleSubmit } = useForm();
  const { loading, error, data } = useFetch("http://localhost:8000/posts/");

  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error. Please try again ....</p>;

  const onSubmit = data => {
    
    console.log(data)};

  return (
    <>
      <h1>Create a New Blog</h1>

      {/* <form>
        <input type="text" name="title" required placeholder="Blog title" />
        <textarea name="body" required placeholder="Blog body"></textarea>
        <button type="button">Create</button>
      </form> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="Blog title" />
        <input {...register("body")} placeholder="Blog body" />

        <input type="submit" />
      </form>
    </>
  );
};

export default Create;
