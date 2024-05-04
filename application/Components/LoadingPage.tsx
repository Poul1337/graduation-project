import { Spinner } from '@nextui-org/react';

const LoadingPage = () => {
  return (
    <div className="absolute inset-0 z-20 backdrop-blur-sm flex justify-center items-center">
      <span>
        <Spinner size="lg" color="primary" />
      </span>
    </div>
  );
};

export default LoadingPage;
