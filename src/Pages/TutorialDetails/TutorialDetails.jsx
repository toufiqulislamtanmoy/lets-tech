import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Dummy data for modules
const modulesData = [
    {
        id: 1,
        title: 'Introduction',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        content: `
        What is React?
React is a JavaScript library for building user interfaces. Developed and maintained by Facebook, React allows developers to create interactive and dynamic UIs with ease. It is widely used for building single-page applications where user interfaces need to be highly responsive.

Key Features of React
Component-Based Architecture: React follows a component-based architecture. UIs are divided into reusable and independent components, making it easier to manage and maintain code.

Virtual DOM: React uses a virtual DOM to optimize updates and improve performance. When data changes, React updates a virtual DOM first and then efficiently updates only the necessary parts of the actual DOM.

JSX (JavaScript XML): React uses JSX, a syntax extension for JavaScript. JSX allows you to write HTML within JavaScript code, making it more readable and convenient.

Unidirectional Data Flow: React follows a unidirectional data flow, meaning data changes flow in a single direction—from parent components to child components. This makes it easier to understand and debug code.
        `
        ,
    },
    {
        id: 2,
        title: 'Basic Concepts',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        content: "Hello, I'm Good",
    },
    {
        id: 3,
        title: 'Advanced Techniques',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        content: "Lorem Ipsum Dolor Sit Amet",
    },
    {
        id: 4,
        title: 'React Hooks',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        content: "Consectetur Adipiscing Elit",
    },
    {
        id: 5,
        title: 'State Management',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        content: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua",
    },
    {
        id: 6,
        title: 'Debugging Tips',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        content: "Ut Enim Ad Minim Veniam",
    },
    {
        id: 7,
        title: 'API Integration',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBluffs.mp4',
        content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
    },
    {
        id: 8,
        title: 'Responsive Design',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun2.mp4',
        content: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua",
    },
    {
        id: 9,
        title: 'Authentication Strategies',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides2.mp4',
        content: "Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat",
    },
    {
        id: 10,
        title: 'Database Management',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns2.mp4',
        content: "Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur",
    },
    {
        id: 11,
        title: 'Deployment Best Practices',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes2.mp4',
        content: "Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum",
    }
];


const TutorialDetails = () => {
    const [selectedModule, setSelectedModule] = useState(modulesData[0]);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleModuleClick = (module) => {
        setSelectedModule(module);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className="h-full max-w-6xl mx-auto lg:flex px-5 lg:px-0">

            {/* Tutorial Content */}
            <div className="lg:w-3/4">
                {selectedTab === 0 && (
                    <div>
                        <h1>{selectedModule.title}</h1>
                        <p>{selectedModule.content}</p>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div>
                        <ReactPlayer
                            url={selectedModule.videoUrl}
                            height={window.innerWidth > 600 ? 450 : 250}
                            width="100%"
                            controls={true}
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 1 },
                                },
                            }}
                        />
                        <h1>{selectedModule.title}</h1>
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

                <ul className='overflow-y-auto h-[50vh] w-full px-5 scrollbar my-5'>
                    {/* Dynamic rendering of modules */}
                    {modulesData.map((module) => (
                        <li key={module.id} className="mb-2">
                            {/* Using react-router-dom Link for navigation */}
                            <div
                                className={`flex items-center cursor-pointer ${selectedModule.id === module.id ? 'font-bold' : ''}`}
                                onClick={() => handleModuleClick(module)}
                            >
                                <span className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                    {module.id}
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
