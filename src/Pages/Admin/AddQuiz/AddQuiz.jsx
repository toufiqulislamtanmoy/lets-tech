import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useQuizQuestion from "../../../Hooks/useQuizQuestion";

const AddQuiz = () => {

    const { id } = useParams();
    const { questions, refetch } = useQuizQuestion(id);
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {

        const quizQuestion = { ...data, langID: id };
        console.log(quizQuestion)

        // Send only the new question data to the server
        const response = await axiosSecure.post(`/addQuizQuestions`, quizQuestion);
        console.log("Response: ", response);
        if (response?.data?.message === "Already Added this question") {
            toast.warn(response?.data?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (response.data.insertedId) {
            reset();
            refetch();
            toast.success("Question Added Successfully", {
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
            toast.error("Did not add the question", {
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
    };

    const handleDeleteQuestion = async (quizID) => {
        try {
            const response = await axiosSecure.delete(`/deleteQuestion/${quizID}`);
            if (response?.data?.deletedCount > 0) {
                toast.success("Question Deleted", {
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
                toast.error("There have an error occur", {
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
            console.log("Delete response:", response);
            refetch();
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <div className="mx-5 mt-28 mb-10 max-w-5xl lg:mx-auto">
            <h2 className="text-2xl font-bold mb-4">Question List</h2>

            {questions?.length > 0 ?
                questions.map((question, index) => (
                    <div key={index} className="mb-6 p-4 border rounded-md shadow-md">
                        <div className="mb-4">
                            <strong>Question:</strong> {question.questionText}
                        </div>
                        <div>
                            <strong>Options:</strong>
                            <ul className="list-disc ml-6">
                                {question?.options?.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <strong>Correct Answer:</strong> {question.correctAnswer}
                        </div>
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            onClick={() => handleDeleteQuestion(question._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
                :
                <p>No More Question Added Yet</p>
            }

            {/* Add New Question Form */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="questionText">
                            Question:
                        </label>
                        <textarea
                            id="questionText"
                            name="questionText"
                            rows="3"
                            className="w-full border rounded-md p-2"
                            {...register("questionText", { required: true })}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Options:</label>
                        {[0, 1, 2, 3]?.map((index) => (
                            <input
                                key={index}
                                type="text"
                                name={`options[${index}]`}
                                {...register(`options[${index}]`, { required: true })}
                                className="w-full border rounded-md p-2 mb-2"
                                placeholder={`Option ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="correctAnswer">
                            Correct Answer:
                        </label>
                        <input
                            type="text"
                            id="correctAnswer"
                            name="correctAnswer"
                            className="w-full border rounded-md p-2"
                            {...register("correctAnswer", { required: true })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    >
                        Add Question
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;