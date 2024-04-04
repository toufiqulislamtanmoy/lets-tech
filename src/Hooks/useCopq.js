import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCopq = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: copq = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['copq'],
        queryFn: async () => {
            // const res = await fetch('http://localhost:5000/dispLang');
            // return res.json();
            const response = await axiosSecure(`copq/${id}`)
            return response.data;
        }
    })

    return { copq, loading, refetch };
}

export default useCopq
