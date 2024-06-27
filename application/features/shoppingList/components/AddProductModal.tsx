import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalProps,
  Tooltip,
} from '@nextui-org/react';
import { Unit } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectItem } from '@nextui-org/select';
import { toast } from 'sonner';

type AddProductModalProps = {
  onOpen: () => void;
  onClose: () => void;
} & ModalProps;

const AddProductModal: FC<AddProductModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  const t = useTranslations('addListModal');
  const units = [
    Unit.BINDY,
    Unit.BUTELKI,
    Unit.KARTONY,
    Unit.OPAKOWANIA,
    Unit.RYZY,
    Unit.SZTUKI,
  ];
  const schema = z.object({
    productName: z.string().min(1, t('isRequired')),
    quantity: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
      .refine((val) => val > 0, t('positiveRule')),
    unit: z.enum(
      [
        Unit.BINDY,
        Unit.BUTELKI,
        Unit.KARTONY,
        Unit.OPAKOWANIA,
        Unit.RYZY,
        Unit.SZTUKI,
      ],
      {
        errorMap: () => ({ message: t('isRequired') }),
      }
    ),
  });

  const {
    trigger,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    reset,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const submit = async (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  const showError = () => {
    if (errors.productName) {
      toast.error(`${t('productName')}: ${errors.productName.message}`);
    }
    if (errors.quantity) {
      toast.error(`${t('quantity')}: ${errors.quantity.message}`);
    }
    if (errors.unit) {
      toast.error(`${t('unit')}: ${errors.unit.message}`);
    }
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
            <h1 className="text-white text-center py-4">{t('addProduct')}</h1>
            <form
              className="flex gap-5 flex-col items-center"
              onSubmit={handleSubmit(submit)}
            >
              <Input
                placeholder={t('productName')}
                type="text"
                id="productName"
                {...register('productName')}
                onBlur={() => trigger('productName')}
                disableAnimation={true}
              />

              <Input
                placeholder={t('quantity')}
                type="number"
                id="quantity"
                {...register('quantity')}
                onBlur={() => trigger('quantity')}
              />
              <Select placeholder={t('unit')} {...register('unit')}>
                {units.map((unit) => (
                  <SelectItem key={unit} className="text-white">
                    {unit}
                  </SelectItem>
                ))}
              </Select>
              <Button
                className="bg-turquoise p-2 my-5 rounded-lg text-white hover:scale-105 duration-200 max-w-32"
                type="submit"
                onClick={showError}
              >
                {t('addProduct')}
              </Button>
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
