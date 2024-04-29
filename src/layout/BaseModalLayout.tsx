import { BaseButton, btn_style } from '@/components/Button';

type BaseModalLayoutProps = {
  children: React.ReactNode;
  hideModal: () => void;
  class_name: string;
  style: object;
  inner_style: object;
}

export const modal_base_style = {
  zIndex: 1000, 
  position: "fixed", top: '0',  bottom: '0', left: '0', right: '0',
  height: "100%" , width: "100%",
  display: "block",
  backgroundColor: 'rgba(128, 128, 128, 0.8)',
}

export const modal_base_inner_style = {
  position: 'absolute', top: '50%', left: '50%', 
  transform: 'translate(-50%, -50%)', 
  background: 'white', 
  padding: '80px 20px', 
  borderRadius: '8px',
  maxWidth: "80vw",
}

export const BaseModalLayout = ( {
    children, 
    hideModal,
    class_name="",
    style=modal_base_style, 
    inner_style=modal_base_inner_style
}: BaseModalLayoutProps) => {

    return (
      <div 
        style={style}
      >
        <div className={`container ${class_name}`} style={inner_style}>
          <BaseButton callback={hideModal} style={btn_style}>Close</BaseButton>
          {children}
        </div>
      </div>
    );
  };