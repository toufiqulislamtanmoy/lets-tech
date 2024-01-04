import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useAllLanguge from '../../Hooks/useAllLanguge';
const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useAllLanguge();
    const [filteredLanguages, setFilteredLanguages] = useState([]);

    // Update filteredLanguages when language changes
    useEffect(() => {
        setFilteredLanguages(language);
    }, [language]);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = language.filter((lang) =>
            lang.langName.toLowerCase().includes(term)
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
                            {filteredLanguages.length > 0 ? (
                                filteredLanguages.map((language) => (
                                    <Link key={language._id} to={`/tutorialdetails/${language._id}`}>
                                        <div className='flex gap-5 justify-center items-center'>
                                            <img className='w-1/3' src={language.thumbUrl} alt="Not Found" />
                                            <h3 className="text-xl font-bold w-2/3">{language.langName}</h3>
                                            <hr className="my-3" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className='text-center w-full'>No Tutorial Found</div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;