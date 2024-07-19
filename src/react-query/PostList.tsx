import { useState } from "react";
import usePosts from "./hooks/usePosts";
import React from "react";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const [page, setPage] = useState(1);
const pageSize = 10
  const { data, error, isLoading, fetchNextPage } = usePosts({userId, page, pageSize});
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Getting Posts...</p>;


  return (
    <>
      <select
        className="mb-4 form-select"
        name="users"
        value={userId}
        onChange={(event) => setUserId(parseInt(event.target.value))}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {data?.pages.map((page) => (
          <React.Fragment>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {/* <button
        disabled={page == 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary me-2 mt-2"
      >
        Previous
      </button> */}
      <button
        onClick={()=>fetchNextPage()}
        className="btn btn-primary me-2 mt-2"
      >
        Next
      </button>
    </>
  );
};

export default PostList;
