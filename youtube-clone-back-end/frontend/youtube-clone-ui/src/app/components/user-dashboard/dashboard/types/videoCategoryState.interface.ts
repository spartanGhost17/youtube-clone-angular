import { CategoryInterface } from "./category.interface";
import { ResponseMessagesInterface } from '../../../../shared/types/responseMessages.interface';

export interface VideoCategoriesState {
    categories: CategoryInterface[];
    validationMessages: ResponseMessagesInterface | null;
    validationErrors: ResponseMessagesInterface | null; 
}