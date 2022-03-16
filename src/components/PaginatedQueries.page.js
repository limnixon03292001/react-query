import { useState } from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = (page) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
}



export const PaginatedQueriesPage = () => {

    // const [finalData, setFinalData] = useState([]);
    const [page,setPage] = useState(1);


    // const onSuccess = (data) => {
    //     setFinalData([...finalData, ...data.data.map(data => data)])
    // }
  
    const {isLoading, isError, error, isFetching, data} = useQuery(['colors', page], () => fetchColors(page) ,{
        // onSuccess,
        keepPreviousData: true
    })

  

    if(isLoading) {
        return <h2>Loading...</h2>
    }
    if(isError) {
        return <h2>{error.message}</h2>
    }
    // console.log(finalData)
    return (
        <div>
            <h2>PaginatedQueriesPage - Colors</h2>
           
            {data?.data.map(color => (
                <h2 key={color.id}>{color.name}</h2>
            ))}
            {isFetching && <p>'Fetching more...'</p>}
            {/* <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Prev</button> */}
            <button onClick={() => setPage(prev => prev + 1)} disabled={page === 4}>Next</button>
            
        </div>
    )
}