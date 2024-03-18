import { Tag } from "../../models/tag";

export interface CreateTagForm {
    videoId: number;
    tags: String[]
}