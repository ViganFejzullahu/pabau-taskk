import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

export default function App() {
  return (
    <div>
      <h3 id="title">SpaceX flights</h3>
      <br />
      <DisplayLaunches />
    </div>
  );
}

const GET_LAUNCHES = gql`
  query GetLaunches {
    launchesPast {
      launch_date_local
      ships {
        image
      }
      mission_name
    }
  }
`;

function DisplayLaunches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return data.launchesPast.map(({ mission_name, launch_date_local }) => (
    <div className="elements">
      <p className="mission-name">{mission_name}</p>
      <p id="dates">{launch_date_local}</p>  
    </div>
  ));
}
