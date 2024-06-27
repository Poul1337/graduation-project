import { FC } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

type AddListButtonProps = {
  onOpen: () => void;
};

const AddListButton: FC<AddListButtonProps> = ({ onOpen }) => {
  return (
    <button
      className="flex w-16 bg-turquoise rounded-full justify-center h-16 items-center absolute bottom-10 right-10 hover:scale-125 duration-200"
      onClick={onOpen}
    >
      <IoAddCircleOutline color="white" size={40} />
    </button>
  );
};

export default AddListButton;
