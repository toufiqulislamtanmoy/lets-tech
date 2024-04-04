import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllQuestions = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: questions = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            // const res = await fetch('http://localhost:5000/dispLang');
            // return res.json();
            const response = await axiosSecure(`all-questions`)
            return response.data;
        }
    })

    return { questions, loading, refetch };
};

export default useAllQuestions;