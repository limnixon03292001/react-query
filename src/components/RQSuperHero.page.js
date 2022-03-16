import { useParams } from "react-router-dom"
import { useFetchSuperHero } from "../hooks/useFetchSuperHero";

const RQSuperHeroPage = () => {
    const {heroId} =  useParams();

    const {isLoading, isError, error, data} = useFetchSuperHero(heroId);

    if(isLoading){
        return <h2>Loading...</h2>
    }
    if(isError){
        return <h2>{error}</h2>
    }

  return (
    <div>
        <h2>RQSuperHero.page</h2>
        {data?.data.name} - {data?.data.alterEgo}
    </div>
  )
}

export default RQSuperHeroPage