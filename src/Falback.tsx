import { useState } from 'react';
import { Error500 } from '@/pages/error';
import { BaseModalLayout } from "@/layout/BaseModalLayout";

export const Fallback = () => {
    const [ show, setShow ] = useState(false);

    const hideModal = () => {
        setShow(false);
    }

    if (show === false) {
        return null
    }
    
    return (
      <BaseModalLayout hideModal={hideModal}>
        <Error500/>
      </BaseModalLayout>
    );
  };
  