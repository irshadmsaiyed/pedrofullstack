import { GET_ALL_POSTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { data } = useQuery(GET_ALL_POSTS);
  const history = useHistory();

  return (
    <>
      <div className="flex flex-wrap">
        {data &&
          data.getAllPosts.map((value, key) => {
            return (
              <div
                className="w-full h-full max-w-md rounded-xl shadow-md overflow-hidden md:max-w-sm ml-8 mt-8"
                key={key}
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                <div className="bg-green-300 w-full text-center font-bold uppercase p-2">
                  {value.title}
                </div>
                <div className="px-2 py-6 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-600">
                  {value.postText}
                </div>
                <div className="p-2 bg-green-100">@{value.username}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
