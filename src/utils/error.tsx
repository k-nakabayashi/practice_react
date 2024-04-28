import { errorRoutingConfig } from "@/routes/error";
import { Error404} from '@/pages/error';

export enum ErrorStatusCode {
    _400 = "400",
    _403 = "403",
    _404 = "404",
    _429 = "429",
    _500 = "500",
}

export function convertToErrorStatusCode(status_code_str: string): ErrorStatusCode {
    const status_code = ErrorStatusCode[`_${status_code_str}` as keyof typeof ErrorStatusCode];

    if (status_code === undefined) {
        return ErrorStatusCode._500;
    } else {
        return status_code
    }
}

export class MyError extends Error {
    status_code: string;

    constructor(status_code: string, message?: string) {
        // エラークラスのコンストラクタにメッセージを渡す
        super(message);
        this.name = 'MyError';
        this.status_code = status_code;
        
        Object.setPrototypeOf(this, MyError.prototype);
        
        // エラースタックの取得
        this.stack = (new Error()).stack;
    }
}

export const selectError = (status_code: string): React.ReactNode => {

    const targetElement = errorRoutingConfig.find(config => config.path === status_code);

    if (targetElement) {
        return targetElement.element;
    } else {
        return <Error404 />
    }
}

