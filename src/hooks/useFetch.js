import { useQuery } from "react-query"
import axios from "axios"

const fetchSuperheroes = () => {
    return axios.get('http://localhost:4000/superheroes');
  }

export const useFetch = (onSuccess,onError) => {
    return useQuery(
        'super-heroes', 
        fetchSuperheroes,
        {
          // enabled: false,
          onSuccess,
          onError,
        //   select: (data) => {
        //     const superHeroesName = data.data.map((hero) => hero.name)
        //     return superHeroesName
        //   }
        }
        
      )
}