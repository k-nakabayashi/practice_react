import { errorRoutingConfig } from "@/routes/error";
import { Error404} from '@/pages/error';

export const selectError = (status_code: string) => {

    const targetElement = errorRoutingConfig.find(config => config.path === status_code);

    if (targetElement) {
        return targetElement.element;
    } else {
        return <Error404 />
    }
}