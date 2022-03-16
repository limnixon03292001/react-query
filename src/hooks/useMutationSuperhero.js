import { useMutation, useQueryClient } from "react-query"
import axios from "axios"

const addSuperHero = (inputs) => {
    return axios.post('http://localhost:4000/superheroes', inputs)
}

export const useMutationSuperhero = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero ,{
        onSuccess: (data) => {
            // we didnt use invalidateQueries function to lessen network request
            // queryClient.invalidateQueries('super-heroes')
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                console.log(oldQueryData)
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data]
                }
            })
        }
    })
}