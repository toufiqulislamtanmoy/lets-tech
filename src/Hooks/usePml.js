import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePml = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: pml = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['pml'],
        queryFn: async () => {
            // const res = await fetch('http://localhost:5000/dispLang');
            // return res.json();
            const response = await axiosSecure(`pml/${id}`)
            return response.data;
        }
    })

    return { pml, loading, refetch };
}

export default usePml
