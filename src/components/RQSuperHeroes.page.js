import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";


export const RQSuperHeroesPage = () => {
 
  const onSuccess = (data) => {
    console.log("Data fetched successfully", data);
  }

  const onError = (error) => {
    console.log("Data error", error);
  }

  const {isLoading, isfetching, data, isError, error, refetch} = useFetch(onSuccess,onError)
  
  if(isLoading || isfetching){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }

  return (
    <div>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Refresh</button>
      {data?.data.map((hero,id) => (
        <div key={id}>
          <Link to={`/rq-super-hero/${hero.id}`} >{hero.name}</Link>
        </div>
      ))}
      {/* {data.map((heroName) => (
           <div key={heroName}>{heroName}</div>
      ))} */}
    </div>
  )
}
