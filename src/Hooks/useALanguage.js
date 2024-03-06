import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useALanguage = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: singlelanguage = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['singlelanguage'],
        queryFn: async () => {
            // const res = await fetch('https://learn-program-server.vercel.app/dispLang');
            // return res.json();
            const response = await axiosSecure(`single-language/${id}`)
            return response.data;
        }
    })

    return { singlelanguage, loading, refetch };
};

export default useALanguage;