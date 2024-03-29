import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useQuizQuestion = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: questions = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            // const res = await fetch('https://learn-program-server.vercel.app/dispLang');
            // return res.json();
            const response = await axiosSecure(`getQuestions/${id}`)
            return response.data;
        }
    })

    return { questions, loading, refetch };
};

export default useQuizQuestion;