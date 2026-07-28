import useFetch from "../hooks/useFetch";
import { useState } from "react";

const Books = () => {
  const [deleteMessage, setDeleteMessage] = useState("");

  const { data, loading , error } = useFetch("https://bi-1-3-hw-1-backend-three.vercel.app/books");
    // console.log(data)

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error loading movies: {error}</p>;
  }

  const handleDelete = async (bookId) =>{
    try{
      const response = await fetch(`https://bi-1-3-hw-1-backend-three.vercel.app/books/${bookId}`,
        {method: "DELETE"}
      );

      if(!response.ok){
        throw "Failed to delete book"
      }

      const data = await response.json()
      if(data){
        setDeleteMessage("Book Deleted Successfully.");
      }

    } catch(error){
      console.log(error);
    }
  }

  return(
    <div>
           {data?.length ? (
            <>
               <ul>
                <h2>List Of Books</h2>
                  {data?.map((book) => (
                   <li key={book._id ?? book.title}>
                     <h3>{book.title}{" "}<button onClick={()=> handleDelete(book._id)}>Delete</button></h3>
                     <p>Author: {book.author}</p>
                     <p>Published Year: {book.publishedYear}</p>
                     <p>Genre: {book.genre.join(", ")}</p>
                     <p>Language: {book.language}</p>
                     <p>Country: {book.country}</p>
                     <p>Rating: {book.rating}</p>
                     <p>Summary: {book.summary}</p>
                     <p>Image: {book.coverImageUrl}</p>
                  </li>
            ))}
               </ul>
               <p>{setDeleteMessage}</p>
            </>   
            ) : (
                   <p>No books found.</p>
                )}
   </div>
    )
};
export default Books;