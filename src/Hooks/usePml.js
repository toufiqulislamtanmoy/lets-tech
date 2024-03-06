import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePml = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: pml = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['pml'],
        queryFn: async () => {
            // const res = await fetch('https://learn-program-server.vercel.app/dispLang');
            // return res.json();
            const response = await axiosSecure(`pml/${id}`)
            return response.data;
        }
    })

    return { pml, loading, refetch };
}

export default usePml
