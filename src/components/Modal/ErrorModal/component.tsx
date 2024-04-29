import { selectError } from '@/utils/error';
import { useContext } from 'react';
import { ErrorContext } from '@/components/Modal/ErrorModal/provider';
import { BaseModalLayout, modal_base_style, modal_base_inner_style } from "@/layout/BaseModalLayout";

export const ErrorModal = () => {
    const { status_code, hideModal } = useContext(ErrorContext);
  
    if ([null, "", "200"].includes(status_code)) {
      return null;
    }

    return (
      <BaseModalLayout hideModal={hideModal} class_name={""} style={modal_base_style} inner_style={modal_base_inner_style}>
        {selectError(status_code)}
      </BaseModalLayout>
    );
  };
  