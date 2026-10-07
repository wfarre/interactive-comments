import { useEffect, useState } from "react";
import CommentList from "./components/CommentList";
import useFetch from "./hooks/useFetch";
import type { CommentModelProps } from "./models/CommentModel";
import type { UserProps } from "./models/UserModel";
import CommentForm from "./components/CommentForm";
import { useSelector } from "@tanstack/react-store";
import store from "./store/store";

function App() {
  const { data, loading, error } = useFetch<{
    comments: CommentModelProps[];
    currentUser: UserProps;
  }>("/data.json");

  const currentUser = useSelector(store, (s) => s.currentUser);

  // Seed the store once the fetched data arrives
  useEffect(() => {
    if (!data) return;
    store.actions.setComments(data.comments ?? []);
    store.actions.setCurrentUser(data.currentUser ?? null);
  }, [data]);

  const [newPost, setNewPost] = useState("");
  const handerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !newPost.trim()) return;
    // The store assigns the id
    store.actions.addComment({
      content: newPost,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    });
    // data?.comments.push({

    // data?.comments.push({
    //   id: data.comments.length + 1,
    //   content: newPost,
    //   createdAt: "Just now",
    //   score: 0,
    //   user: data.currentUser as UserProps,
    //   replies: [],
    // });
    setNewPost("");
  };

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
        <CommentList />
      </section>
      <section className="">
        <CommentForm
          onSubmit={handerSubmit}
          currentUser={currentUser}
          postContent={newPost}
          setPostContent={setNewPost}
        />
      </section>
    </div>
  );
}

export default App;
