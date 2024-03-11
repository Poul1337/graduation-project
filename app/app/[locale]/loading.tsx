import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <PacmanLoader color="#0392a8" />
    </div>
  );
};

export default Loading;
