import { Link } from 'react-router-dom';

import { useState } from 'react';
const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const programmingLanguagesData = [
        {
            id: 1,
            name: 'JavaScript',
            icon:"https://i.ibb.co/gSWKN4J/js.png"

        },
        {
            id: 2,
            name: 'Python',
            icon:"https://i.ibb.co/88mpZsS/python.png"
        },
        {
            id: 3,
            name: 'Java',
            icon:"https://i.ibb.co/mFbhZX7/java.png"
        },
        {
            id: 4,
            name: 'C++',
            icon:"https://i.ibb.co/6Z4yFb9/c.png"
        },
        {
            id: 5,
            name: 'Ruby',
            icon:"https://i.ibb.co/MgMyqdG/ruby.png"
        },
    ];

    const [filteredLanguages, setFilteredLanguages] = useState(programmingLanguagesData);
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = programmingLanguagesData.filter(language =>
            language.name.toLowerCase().includes(term)
        );

        setFilteredLanguages(filtered);
    };

    return (
        <div className="hero min-h-screen" >
            <div className=""></div>
            <div className=" text-center mx-5 lg:mx-0">
                <div className="max-w-4xl">
                    <h1 className="mb-5 text-5xl font-bold">Learning Is Fun</h1>
                    <p className="mb-5">Start Learning By Searching</p>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Search A Tutorial"
                            className="w-full px-3 py-3 rounded-3xl focus:outline-none text-black border border-green-400"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </form>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-3">Programming Languages</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-10">
                            { filteredLanguages.length > 0 ?
                            
                            filteredLanguages.map((language) => (
                                <Link key={language.id} to={`/tutorialdetails/${language.id}`}>
                                    <div className='flex gap-5 justify-center items-center'>
                                        <img className='w-1/3' src={language.icon} alt="Not Found" />
                                        <h3 className="text-xl font-bold w-2/3">{language.name}</h3>
                                        <hr className="my-3" />
                                    </div>
                                </Link>
                            )) :
                            <div className='text-center w-full'>No Tutorial Found</div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;