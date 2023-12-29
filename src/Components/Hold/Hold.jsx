// import { Dna } from "react-loader-spinner";


const Hold = ({ text }) => {
  return (
    <div className="flex space-x-6 items-center justify-center h-[100vh]">
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
      <h2>{text}</h2>
    </div>
  );
};

export default Hold;