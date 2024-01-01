import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useALanguage = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: singlelanguage = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['singlelanguage'],
        queryFn: async () => {
            // const res = await fetch('http://localhost:5000/dispLang');
            // return res.json();
            const response = await axiosSecure(`single-language/${id}`)
            return response.data;
        }
    })

    return {singlelanguage, loading, refetch};
};

export default useALanguage;