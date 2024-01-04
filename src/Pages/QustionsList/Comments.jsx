import { useForm } from "react-hook-form";
import useAllQuestions from "../../Hooks/useAllQuestions";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Provider/AuthProviders";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCopq from "../../Hooks/useCopq";

const Comments = () => {
    const { questions } = useAllQuestions();
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { copq } = useCopq(questionId);

    const onSubmit = (data, e) => {
        const questionId = e.nativeEvent.submitter.getAttribute('data-question-id');
        // console.log(data, questionId);
        const commentData = {
            commenterName: user?.displayName,
            commenterEmail: user?.email,
            commenterPhoto: user?.photoURL,
            questionId,
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
        <div className="overflow-auto max-h-screen">
            {questions?.map((question) => (
                <div key={question._id} className="bg-white shadow-md p-4 mb-4 rounded">
                    <div className="flex items-center mb-2">
                        <img
                            src={question?.photoURL}
                            alt={`${question?.name}'s profile`}
                            className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                            <span className="font-bold">{question?.name}</span>
                            <div className="text-gray-500">
                                {new Date(question?.timestamp).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700">{question.question}</p>

                    {/* Display Comments */}
                    {/* {comments[question._id] && (
                        <div className="mt-4">
                            <strong>Comments:</strong>
                            <ul>
                                {comments[question._id].map((comment, index) => (
                                    <li key={index} className="my-5 shadow-lg border-2 p-3 border-red-50">
                                        <div className="flex gap-2 items-center">
                                            <div><img src={user?.photoURL} alt="" className="w-9 h-9 rounded-full" /></div>
                                            <div>
                                                <h2>{user?.displayName}</h2>
                                                <p>12:01</p>
                                            </div>
                                        </div>
                                        <h3 className="m-3">{comment}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}

                    {/* Comment Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-4 border-t pt-4"
                        data-question-id={question._id}
                    >
                        <div className="flex items-center">
                            <textarea
                                {...register('commentText')}
                                placeholder="Add a comment..."
                                className="w-full resize-none border rounded-md p-2 mr-2 focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                                title="Add Comment"
                                data-question-id={question._id}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </div>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default Comments;