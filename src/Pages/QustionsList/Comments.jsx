import { useForm } from "react-hook-form";

import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Provider/AuthProviders";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { format } from "date-fns";


const Comments = ({ qid }) => {
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [commentToggole, setCommentToggole] = useState(false);
    const [copq, setCopq] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosSecure.get(`http://localhost:5000/copq/${qid}`);

                console.log(`qid => ${qid} Comments =>`, response.data);
                setCopq(response.data)
            } catch (error) {
                console.error(`Error fetching comments for qid ${qid}:`, error);
            }
        };
        fetchComments();
    }, [axiosSecure, qid]);


    const onSubmit = (data) => {

        const commentData = {
            commenterName: user?.displayName,
            commenterEmail: user?.email,
            commenterPhoto: user?.photoURL,
            questionId: qid,
            commentText: data?.commentText,
            timestamp: new Date().toISOString()
        }


        axiosSecure.post('http://localhost:5000/add-comment', commentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response?.data?.insertedId) {
                    reset();
                    refetch();
                    toast.success("Comment added", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error("Error Occur", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                }
                console.log(response);
            })
            .catch(error => {
                console.error('Error creating account:', error);
            });
    }

    return (
        <div className="">
            <div className="mx-3 lg:mx-10">
                {/* <h2>Show Comment</h2> */}
                <button onClick={() => setCommentToggole(!commentToggole)}>
                    <h2 className="flex items-center gap-2 text-right">
                        <FontAwesomeIcon icon={faComment} />
                        <h3>{copq?.length}</h3>
                    </h2>
                </button>
            </div>
            {commentToggole &&
                <div className="bg-white shadow-md p-4 mb-4 rounded space-y-10">
                    {/* Display Comments */}
                    {
                        copq.map(comment =>
                            <div key={comment._id} className="shadow-lg p-3">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <img src={comment?.commenterPhoto} className="w-10 h-10 rounded-full" alt="" />
                                    </div>
                                    <div>
                                        <h2 >{comment?.commenterName}</h2>
                                        <p className="text-xs">
                                            {format(
                                                new Date(comment?.timestamp),
                                                "MMM dd"
                                            )
                                            }

                                        </p>
                                    </div>
                                </div>
                                <p className="ml-5 my-2" key={comment._id}>{comment?.commentText}</p>
                            </div>
                        )
                    }

                    {/* Comment Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-4 border-t pt-4"

                    >
                        <div className="">
                            <div className="flex-grow">
                                <textarea
                                    {...register('commentText')}
                                    placeholder="Add a comment..."
                                    className="w-full h-[150px] resize-none border rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 h-[100%]"
                                    title="Add Comment"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            }
        </div>
    );
};

export default Comments;