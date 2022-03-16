import { useQueries } from "react-query"
import axios from "axios"


const fetchSuperheroes = (id) => {
    return axios.get(`http://localhost:4000/superheroes/${id}`);
}

export const DynamicParallelQueriesPage = ({heroIds}) => {
    const queryResults = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ['super-heroes', id],
                queryFn: () => fetchSuperheroes(id),
            }
        })
    )

    console.log({queryResults});
  return (
    <div>
       <h2>DynamicParallelQueries.page</h2>
        {queryResults?.map((data) => (
            <div key={data?.data?.data.id}>{data?.data?.data.alterEgo }</div>
        ))}
    </div>
  )
}
