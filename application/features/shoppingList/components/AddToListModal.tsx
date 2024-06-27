import { usePostShoppingList } from '@/hooks/usePostShoppingList';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ModalProps,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Tooltip,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AddToListModal = {
  onOpen: () => void;
  onClose: () => void;
} & ModalProps;

const AddToListModal: FC<AddToListModal> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  const t = useTranslations('addListModal');
  const { mutate } = usePostShoppingList({ onClose });

  const schema = z.object({
    listName: z.string().min(1, t('isRequired')),
  });

  const {
    trigger,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const submit = async (values: z.infer<typeof schema>) => {
    mutate(values.listName, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <h1 className="text-white text-center py-4">{t('addList')}</h1>
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col items-center"
            >
              <Tooltip
                content={errors.listName?.message}
                isDisabled={!errors.listName?.message}
                isOpen={!!errors.listName?.message}
                placement="right"
                showArrow={true}
                color="danger"
              >
                <input
                  className="focus-visible:outline-none text-white rounded-lg px-2 border-gray-600 border-2 w-full"
                  placeholder={t('listName')}
                  id="listName"
                  {...register('listName')}
                  onBlur={() => trigger('listName')}
                />
              </Tooltip>
              <Button
                className="bg-turquoise p-2 my-5 rounded-lg text-white hover:scale-105 duration-200 max-w-32"
                type="submit"
              >
                {t('addList')}
              </Button>
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddToListModal;
