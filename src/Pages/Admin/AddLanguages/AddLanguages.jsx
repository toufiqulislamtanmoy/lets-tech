// AddLanguages.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const AddLanguages = () => {
  const [tutorialList, setTutorialList] = useState([
    { id: 1, title: 'React Basics' },
    { id: 2, title: 'Node.js Fundamentals' },
    // Add more tutorial items as needed
  ]);

  const [newLanguage, setNewLanguage] = useState('');

  useEffect(() => {
    // Fetch tutorial list from your database and update the state
    // Example: fetchTutorials().then(data => setTutorialList(data));
  }, []);

  const handleAddLanguage = () => {
    // Implement add languages logic
    console.log('Adding new language:', newLanguage);
    // Reset the newLanguage input
    setNewLanguage('');
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Listed Languages</h1>

      <ul className="grid grid-cols-1 gap-4">
        {tutorialList.map((tutorial) => (
          <li key={tutorial.id} className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{tutorial.title}</span>
              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    // Implement update tutorial logic
                    console.log(`Updating tutorial: ${tutorial.title}`);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => {
                    // Implement add tutorial logic
                    console.log(`Adding tutorial: ${tutorial.title}`);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </li>
        ))}

        {/* Option to add languages */}
        <li className="bg-gray-100 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="New Language"
              className="border border-gray-300 p-2 rounded-md w-1/2"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 lg:py-2 lg:px-4 rounded"
              onClick={handleAddLanguage}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Language
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AddLanguages;
