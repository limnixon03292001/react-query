import React, {useState} from 'react'
import { useFetch } from '../hooks/useFetch'
import { useMutationSuperhero } from '../hooks/useMutationSuperhero';

export const MutationPage = () => {
    const [inputs, setInputs] = useState({name: "", alterEgo: ""})
    const {data, isLoading, isFetching, refetch} = useFetch();
    const { mutate } = useMutationSuperhero(inputs)

    const handleAddHero = () => {
        mutate(inputs)
    }
  return (
    <div>
       <h2>Mutation.page</h2>
        
            <input type="text" name="name" placeholder="name" value={inputs.name} onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value}) }/>
            <input type="text" name="alterEgo" placeholder="alterEgo" value={inputs.alterEgo} onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value}) }/>
            <button onClick={handleAddHero}>Submit</button>
       
        <button onClick={refetch}>Refetch Data</button>
        {/* data */}
        
        {isLoading ? <h3>Loading...</h3> :
            data?.data.map((hero,id) => (
                <div key={id}>{hero.name}</div>
            ))
        }

    </div>
  )
}

