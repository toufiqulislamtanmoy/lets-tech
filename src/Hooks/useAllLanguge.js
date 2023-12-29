import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllLanguge = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: language = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['language'],
        queryFn: async () => {
            // const res = await fetch('http://localhost:5000/dispLang');
            // return res.json();
            const response = await axiosSecure(`dispLang`)
            return response.data;
        }
    })

    return {language, loading, refetch};
};

export default useAllLanguge;