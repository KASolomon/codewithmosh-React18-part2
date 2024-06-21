import usePosts from './hooks/usePosts';



const PostList = () => {

const {data : posts, error, isLoading} = usePosts()
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Getting Posts...</p>;

  return (
    <ul className="list-group">
      {posts?.map((post) => (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
