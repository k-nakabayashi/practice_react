import { selectError } from '@/utils/error';
import { useContext } from 'react';
import { ErrorContext } from '@/components/Modal/ErrorModal/provider';
import { BaseModalLayout } from "@/layout/BaseModalLayout";

export const ErrorModal = () => {
    const { status_code, hideModal } = useContext(ErrorContext);
  
    if ([null, "", "200"].includes(status_code)) {
      return null;
    }

    return (
      <BaseModalLayout hideModal={hideModal}>
        {selectError(status_code)}
      </BaseModalLayout>
    );
  };
  