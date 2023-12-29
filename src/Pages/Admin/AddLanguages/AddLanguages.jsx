// AddLanguages.js
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import useAllLanguge from '../../../Hooks/useAllLanguge';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';


const AddLanguages = () => {

  const { language, refetch } = useAllLanguge();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // console.log(language);


  useEffect(() => {
    // Fetch tutorial list from your database and update the state
    // Example: fetchTutorials().then(data => setTutorialList(data));
  }, []);


  const onSubmit = data => {
    fetch('http://localhost:5000/addLang', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        console.log(data.message);
        if (data?.message === "You Already Added") {
          toast.warn(data?.message, {
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
          refetch();
        }
      });
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Listed Languages</h1>

      <ul className="grid grid-cols-1 gap-4">
        {language.map((tutorial) => (
          <li key={tutorial._id} className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{tutorial.langName}</span>
              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    // Implement update tutorial logic
                    console.log(`Updating tutorial: ${tutorial.langName}`);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => {
                    // Implement add tutorial logic
                    console.log(`Adding tutorial: ${tutorial.langName}`);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    // Implement add tutorial logic
                    console.log(`Adding tutorial: ${tutorial.langName}`);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </li>
        ))}

        {/* Option to add languages */}
        <li className="bg-gray-100 p-4 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} className="lg:flex items-center justify-between">
            <div className='flex flex-col lg:w-[70%] gap-3'>
              <div className="lg:w-full ">
                <input
                  {...register("langName", { required: true })}
                  type="text"
                  placeholder="Language Name"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                {errors.langName && (
                  <span className="text-red-500">Tutorial Language Name is required</span>
                )}
              </div>
              <div className="lg:w-full ">
                <input
                  {...register("thumbUrl", { required: true })}
                  type="text"
                  placeholder="Language Thumbnail"
                  className="mt-2 lg:mt-0 border border-gray-300 p-2 rounded-md w-full"
                />
                {errors.thumbUrl && (
                  <span className="text-red-500">Tutorial Language Thumbnail is required</span>
                )}
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 w-full lg:w-auto rounded"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Language
              </button>
            </div>
          </form>


        </li>
      </ul>
    </div>
  );
};

export default AddLanguages;
