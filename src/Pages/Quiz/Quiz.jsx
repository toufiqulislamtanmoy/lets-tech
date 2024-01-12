import { useNavigate, useParams } from "react-router-dom";
import useQuizQuestion from "../../Hooks/useQuizQuestion";
import { useContext, useState } from "react";
import useALanguage from "../../Hooks/useALanguage";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProviders";

const Quiz = () => {
    const { qid } = useParams();
    const { user } = useContext(AuthContext);
    const { singlelanguage } = useALanguage(qid);
    console.log(singlelanguage)
    const { questions } = useQuizQuestion(qid);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);

    const handleOptionSelect = (questionId, selectedOption) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: selectedOption,
        });
    };

    const handleSubmit = async () => {
        let correctAnswers = 0;

        questions.forEach((question) => {
            if (selectedAnswers[question._id] === question.correctAnswer) {
                correctAnswers += 1;
            }
        });

        const percentage = (correctAnswers / questions.length) * 100;
        setScore(percentage.toFixed(0));
        const progressData = {
            name: user?.displayName,
            email: user?.email,
            langName: singlelanguage.langName,
            langId: qid,
            progress: percentage,
            submitAt: new Date(),
        }
        try {
            const response = await axiosSecure.post(`/progress`, progressData);
            console.log(response?.data)
            if (response?.data?.insertedId) {
                toast.success("Quiz Submitted", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/', { replace: true })

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
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };


    return (
        <div className="pt-28 lg:mx-10">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{singlelanguage?.langName}</h2>
                <p>Explore, learn, conquer. Knowledge is your greatest adventure.</p>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {questions.map((question, index) => (
                    <div key={question._id} className="mx-6 my-6">
                        <p className="text-lg font-semibold text-green-500">{index + 1}. {question?.questionText}</p>
                        <div className="flex flex-wrap mt-2">
                            {question?.options?.map((option) => (
                                <label
                                    key={option}
                                    className="mr-4 mb-2 cursor-pointer font-semibold"
                                >
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        checked={selectedAnswers[question._id] === option}
                                        onChange={() =>
                                            handleOptionSelect(question._id, option)
                                        }
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="btn bg-gradient-to-r from-primary to-[#a965c8] hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline transition-all  duration-300 delay-100 rounded-full"
            >
                Submit
            </button>
            <div className="divider"></div>
            {score > 0 && (
                <p className="mt-4">
                    Your score: {score} out of {questions.length}
                </p>
            )}
        </div>
    );
};

export default Quiz;