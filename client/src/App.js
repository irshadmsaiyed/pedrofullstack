import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Navbar from "./pages/components/Navbar";
import Post from "./pages/components/Post";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/createpost" exact component={CreatePost}></Route>
              <Route path="/post/:id" exact component={Post}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route
                path="/registration"
                exact
                component={Registration}
              ></Route>
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
