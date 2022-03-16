import { useQuery } from "react-query"
import axios from "axios"


const fetchUser = (userEmail) => {
    return axios.get(`http://localhost:4000/users/${userEmail}`)
}

const fetchChannel = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependedQueriesPage = ({email}) => {

    const {data: userData, isLoading: userLoading} = useQuery(['user', email], () => fetchUser(email))
    const channelId = userData?.data.channelId;

    const {data: channelData, isLoading: channelLoading} = useQuery(['channel', channelId], () => fetchChannel(channelId), 
    {
        enabled: !!channelId
    })
    
    if(userLoading) {
        return <h2>Loading... Fetching User</h2>
    }

    if(channelLoading){
        return <h2>Loading... Fetching User's Channel</h2>
    }

  return (
    <div>
       <h2>Dependent QueriesPpage</h2> 
       <h3>Users: {userData?.data.id}</h3>
       <h3>Courses</h3>
       {channelData?.data.courses.map((course) => (
           <p key={course}>{course}</p>
       ))}
    </div>
  )
}
