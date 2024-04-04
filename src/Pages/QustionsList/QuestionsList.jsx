import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProviders';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAllQuestions from '../../Hooks/useAllQuestions';
import { useForm } from 'react-hook-form';
import Comments from './Comments';
import { format } from "date-fns";


const QuestionsList = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { questions, refetch } = useAllQuestions();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    console.log(user)
    const onSubmit = ({ question }) => {
        // console.log({ question });
        const questionData = {
            question,
            name: user.displayName,
            email: user.email,
            photoURL: user?.photoURL,
            timestamp: new Date().toISOString()
        }

        axiosSecure.post('http://localhost:5000/add-question', questionData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response?.data?.insertedId) {
                    reset();
                    refetch();
                    toast.success("Question added successfully", {
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
                // console.log(response);
            })
            .catch(error => {
                console.error('Error creating account:', error);
            });
    }






    return (
        <div className="container mx-auto pt-28 pb-10">
            <div className="mb-4">
                <div className="text-right">
                    <button
                        className="cursor-pointer text-xl hover:text-sky-400 text-warning"
                        onClick={() => document.getElementById('name').showModal()}
                    >
                        Do you have any questions<FontAwesomeIcon className="text-lg mx-2" icon={faPlus} />
                    </button>
                </div>
                <dialog id="name" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className="flex items-center justify-center flex-col">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white">Ask Question</span>
                                    </label>

                                    <textarea
                                        placeholder="Type Questions"
                                        className="textarea textarea-bordered  lg:w-[700px] lg:h-[300px]"
                                        {...register('question', { required: true })}
                                    />
                                    {errors.question && <span className="text-yellow-400 block">Did Not Add Anything</span>}
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="bg-base-200 px-3 text-green-500 rounded-full" title="Save Changes">

                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </div>
                        </form>

                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div className="">
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
                                    <p className="text-xs">
                                        {format(
                                            new Date(question?.timestamp),
                                            "MMM dd"
                                        )
                                        }

                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-lg">{question.question}</p>
                        <div className="divider"></div>
                        <Comments qid={question._id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
