
import { useState } from 'react';

type BaseButtonProps = {
  children: React.ReactNode;
  callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style: object;
}

export const BaseButton = ({children, callback, style={}}: BaseButtonProps) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // ボタンが無効状態であれば何もしない
      if (isDisabled) return;

      // 親コンポーネントから渡されたクリックイベント関数を実行
      callback(e);
      
      // ボタンを無効化
      setIsDisabled(true);

      // 1秒後にボタンを再び有効化
      setTimeout(() => {
        setIsDisabled(false);
      }, 1000);
    };

    
    return (
        <button className='a-Btn' style={style} onClick={handleClick} disabled={isDisabled}>
          {children}
        </button>

    )
} 
