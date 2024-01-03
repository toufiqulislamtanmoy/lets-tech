import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JoditEditor from 'jodit-react';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../Provider/AuthProviders';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const initialPosts = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            photo: 'https://placekitten.com/50/50', // Placeholder photo URL
        },
        text: "Enjoying a beautiful day at the beach! 🏖️ #vacation",
        timestamp: new Date('2022-03-01T12:30:00').toISOString(), // Placeholder timestamp
    },
    {
        id: 2,
        user: {
            name: 'Jane Smith',
            photo: 'https://placekitten.com/51/51', // Placeholder photo URL
        },
        text: "Just finished reading an amazing book. Highly recommend! 📚 #bookworm",
        timestamp: new Date('2022-03-02T15:45:00').toISOString(), // Placeholder timestamp
    },
];

const QuestionsList = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [textContent, setContent] = useState("");
    const editor = useRef(null);
    console.log(user)
    const handleAddPost = (event) => {
        event.preventDefault();
        console.log(textContent);
        const questionData = {
            question: textContent,
            email: user.email,
            photourl: user?.photoURL,
            timestamp: new Date().toISOString(),
            Comment: []
        }
        axiosSecure.post('http://localhost:5000/add-question', questionData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                // reset();
                if (response?.data?.insertedId) {
                    setContent('');
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
                console.log(response);
            })
            .catch(error => {
                console.error('Error creating account:', error);
            });
    };

    return (
        <div className="container mx-auto mt-8 p-4">
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
                        <form onSubmit={handleAddPost} className='z-10'>
                            <div className="flex items-center justify-center flex-col">
                                <div className="form-control">
                                    <label htmlFor="TextTutorial" className="block text-sm font-bold mb-2 text-gray-600">
                                        Enter Your Problem Statement
                                    </label>
                                    <JoditEditor
                                        value={textContent}
                                        tabIndex={1}
                                        onChange={(newContent) => setContent(newContent)}
                                        ref={editor}
                                    />

                                </div>
                            </div>
                            <div className="text-end">
                                <button type="submit" className="bg-base-200 px-3 text-green-500 rounded-full" title="Save Changes">
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
            <div className="overflow-auto max-h-screen">
                {initialPosts.map((post) => (
                    <div key={post.id} className="bg-white shadow-md p-4 mb-4 rounded">
                        <div className="flex items-center mb-2">
                            <img
                                src={post.user.photo}
                                alt={`${post.user.name}'s profile`}
                                className="h-8 w-8 rounded-full mr-2"
                            />
                            <div>
                                <span className="font-bold">{post.user.name}</span>
                                <div className="text-gray-500">
                                    {new Date(post.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700">{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
