import { useQuery } from "react-query"
import axios from "axios"

const fetchSuperheroes = () => {
    return axios.get('http://localhost:4000/superheroes');
}

const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends');
}

export const ParallelQueriesPage = () => {

    const {data: superHeroes}  = useQuery('super-heroes', fetchSuperheroes);
    const {data: friends}= useQuery('friends', fetchFriends);

    return (
        <div>
            <h2>Parallel Queries</h2>
            <h3>Superheroes</h3>
            {
                superHeroes?.data.map((hero) => (
                    <p key={hero.id}>{hero.name}</p>
                ))
            }
              <h3>Friends</h3>
            {
                friends?.data.map((friend) => (
                    <p key={friend.id}>{friend.name}</p>
                ))
            }
        </div>
    )
}