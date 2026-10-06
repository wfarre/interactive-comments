import CommentList from "./components/CommentList";
import useFetch from "./hooks/useFetch";
import type { CommentModelProps } from "./models/CommentModel";
import type { UserProps } from "./models/UserModel";

function App() {
  const { data, loading, error } = useFetch<{
    comments: CommentModelProps[];
    user: UserProps;
  }>("/data.json");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-grey-50 min-h-screen">
      <section className="flex flex-col justify-center gap-4 max-w-182.5 mx-auto pt-15">
        <CommentList initialComments={data.comments ?? []} />
      </section>
      <section className="flex items-start justify-center gap-4 max-w-182.5 mx-auto bg-white p-6 rounded-lg">
        <img
          className="w-8 h-8 rounded-full"
          src={data.user?.image.png}
          alt={data.user?.username}
        />
        <textarea
          className="w-full p-4 rounded-lg border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Add a comment..."
        ></textarea>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Send
        </button>
      </section>
    </div>
  );
}

export default App;
