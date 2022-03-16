import {useRef, useCallback} from "react"
import { useInfiniteQuery } from "react-query"
import axios from "axios"

const fetchColors = ({pageParam = 0}) => {
    console.log(pageParam)
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}


export const InfiniteQueryPage = () => {

    const {isLoading, isError, error, isFetching, isFetchingNextPage,data, fetchNextPage, hasNextPage} = useInfiniteQuery(['colors'], fetchColors, {
        getNextPageParam: (lastpage, pages) => {
            // Explanation: Here we always have to access and check the last index of an array if there is new data in data property. So if there's no data then we are going to return undefined otherwise we add 1 to continue.
            const nextPage = pages[pages.length - 1];
            if(nextPage.data.length === 0) {
                return undefined
            }else{
                return pages.length + 1
            }
        }     
    })

        ///not working well
    const observer = useRef();
   
    const lastBookElementRef = useCallback((node) => {
        if(isFetching) return 
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasNextPage){
                fetchNextPage();
                console.log("load !")
            }
        }, {rootMargin: "550px"})
        if(node) observer.current.observe(node);
    },[isFetching, hasNextPage ,fetchNextPage])

  return (
    <div>
        <h2>InfiniteQueryPage</h2>
        

        {console.log(data)}
        {data?.pages.map((group,i) => {

                if(data.pages.length === i + 1){
                         
                    return ( <div key={i} ref={lastBookElementRef}>
                            {group?.data.map((color,id) => (
                                <h2 key={id}>{color.name}ka</h2>
                            ))}
                        </div>
                            )

                } else if(group === 0){
                    return null
                }
                    else{
                    return ( <div key={i -1} >
                        {group?.data.map((color,id) => (
                            <h2 key={id}>{color.name}hehe</h2>
                        ))}
                    </div>)
                }
            
            
            // <div key={i}>
            //     {group?.data.map((color,id) => (
            //         <h2 key={id}>{color.name}</h2>
            //     ))}
            // </div>
        })}        
        {isFetching && !isFetchingNextPage ? <h2>Loading new Data...</h2> : null}
        {/* <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More...</button> */}
        
    </div>
  )
}
