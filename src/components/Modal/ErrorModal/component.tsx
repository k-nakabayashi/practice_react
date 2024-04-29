import { BaseButton, btn_style } from '@/components/Button';
import { selectError } from '@/utils/error';
import { useContext } from 'react';
import { ErrorContext } from '@/components/Modal/ErrorModal/provider';

export const ErrorModal = () => {
    const { status_code, hideErrorModal } = useContext(ErrorContext);
  
    if ([null, "", "200"].includes(status_code)) {
      return null;
    }
    return (
      <div 
        style={{
          zIndex: 1000, 
          position: "fixed", top: '0',  bottom: '0', left: '0', right: '0',
          height: "100%" , width: "100%",
          display: "block",
          backgroundColor: 'rgba(128, 128, 128, 0.8)',
        }}
        onClick={hideErrorModal}
      >
        <div className="container" style={{ 
          position: 'absolute', top: '50%', left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
        }}>
          <BaseButton callback={hideErrorModal} style={btn_style}>Close</BaseButton>
          {selectError(status_code)}
        </div>
      </div>
    );
  };
  