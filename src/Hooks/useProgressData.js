import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Pages/Provider/AuthProviders";

const useProgressData = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: progress = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['progress'],
        queryFn: async () => {
            const response = await axiosSecure(`progressReport/${user?.email}`)
            return response.data;
        }
    })

    return { progress, loading, refetch };
};

export default useProgressData;