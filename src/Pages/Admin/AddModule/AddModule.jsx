import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddModule = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const editor = useRef(null);
    const [textContent, setContent] = useState("")
    const onSubmit = (data) => {
        const newContent = { ...data, textContent, langID: id };
        axiosSecure.post('http://localhost:5000/add-module', newContent, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                // reset();
                if (response?.data?.message === "You Already Added") {
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
                } else {
                    reset();
                    setContent('');
                    toast.success("Module Added Successfully", {
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
        console.log(newContent);
    };

    return (
        <div className="container mx-auto mt-8 p-4 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white p-6 rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-bold mb-2 text-gray-600">
                        Content Module Title
                    </label>
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        id="title"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter module title"
                    />
                    {errors.title && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="tutorialVideoURL" className="block text-sm font-bold mb-2 text-gray-600">
                        Tutorial Video URL
                    </label>
                    <input
                        {...register("tutorialVideoURL", { required: true })}
                        type="text"
                        id="tutorialVideoURL"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter video URL"
                    />
                    {errors.tutorialVideoURL && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="TextTutorial" className="block text-sm font-bold mb-2 text-gray-600">
                        Text Tutorial
                    </label>
                    <JoditEditor
                        ref={editor}
                        value={textContent}
                        tabIndex={1}
                        onChange={newContent => setContent(newContent)}

                    />

                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddModule;
