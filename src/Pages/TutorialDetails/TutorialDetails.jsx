import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';
import usePml from '../../Hooks/usePml';
import DOMPurify from 'dompurify';

const TutorialDetails = () => {
    const { id } = useParams();
    const { pml } = usePml(id);
    console.log(pml);
    const [selectedModule, setSelectedModule] = useState(pml[0] || []);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleModuleClick = (module) => {
        setSelectedModule(module);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        // Use a temporary DOM element to parse and manipulate the HTML safely
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = selectedModule.textContent;

        // Sanitize HTML content using DOMPurify
        const sanitizedHTML = DOMPurify.sanitize(tempDiv.innerHTML);

        // Update the selectedModule with the sanitized HTML content
        setSelectedModule((prevModule) => ({ ...prevModule, sanitizedHTML }));
    }, [selectedModule.textContent]);

    return (
        <div className="h-full max-w-6xl mx-auto lg:flex px-5 lg:px-0">
            {/* Tutorial Content */}
            <div className="lg:w-3/4">
                {selectedTab === 0 && (
                    <div>
                        <h1 className='text-2xl font-bold my-5'>{selectedModule.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: selectedModule.sanitizedHTML }} />
                    </div>
                )}
                {selectedTab === 1 && (
                    <div>
                        <ReactPlayer
                            url={selectedModule?.tutorialVideoURL}
                            height={window.innerWidth > 600 ? 450 : 250}
                            width="100%"
                            controls={true}
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 1 },
                                },
                            }}
                        />
                        <h1>{selectedModule?.title}</h1>
                    </div>
                )}
            </div>

            {/* Module List */}
            <div className="lg:px-8 lg:w-1/4">
                <h2 className="text-xl font-semibold mb-4">Modules</h2>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    orientation="horizontal"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Text" />
                    <Tab label="Video" />
                </Tabs>

                <ul className="overflow-y-auto h-[50vh] w-full px-5 scrollbar my-5">
                    {/* Dynamic rendering of modules */}
                    {pml.map((module, index) => (
                        <li key={module._id} className="mb-2">
                            <div
                                className={`flex items-center cursor-pointer ${selectedModule._id === module._id ? 'font-bold' : ''
                                    }`}
                                onClick={() => handleModuleClick(module)}
                            >
                                <span className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                    {index + 1}
                                </span>
                                {module.title}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TutorialDetails;
