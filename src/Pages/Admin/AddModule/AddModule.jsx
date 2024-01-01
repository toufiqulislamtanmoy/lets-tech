import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const AddModule = () => {
    const {id} = useParams();
    console.log(id);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const editor = useRef(null);
    const [textContent, setContent] = useState("")
    const onSubmit = (data) => {
        const newContent = {...data,textContent,langID : id};
        console.log(newContent);
    };

    return (
        <div className="container mx-auto mt-8 p-4 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
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
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons

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
