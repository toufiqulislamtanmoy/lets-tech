import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllLanguge = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: languages = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['languages'],
        queryFn: async () => {
            // const res = await fetch('http://localhost:5000/dispLang');
            // return res.json();
            const response = await axiosSecure(`dispLang`)
            return response.data;
        }
    })

    return { languages, loading, refetch };
};

export default useAllLanguge;