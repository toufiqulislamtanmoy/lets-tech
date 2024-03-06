import useProgressData from "../../Hooks/useProgressData";

const Progress = () => {
    const { progress } = useProgressData();
    // console.log(progress)
    return (
        <div className="pt-28">
            <div className="grid grid-cols-1 lg:mx-10 my-10">
                {progress &&
                    progress.map((entry) => (
                        <div key={entry._id} className="mb-4 flex flex-row items-center justify-between p-4 bg-white shadow-md rounded-md">
                            <div>
                                <h2 className="text-lg font-semibold">{entry.langName}</h2>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{entry.submitAt.toLocaleString()}</h2>
                            </div>
                            <div className="radial-progress text-primary" style={{ "--value": entry.progress }} role="progressbar">
                                {entry.progress}%
                            </div>
                        </div>
                    ))}
            </div>
        </div>


    );
};

export default Progress;