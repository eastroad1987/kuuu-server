import { BaseModel } from "../../../common/entity/base.entity";
export declare class UploadFile extends BaseModel {
    name: string;
    originalName: string;
    encoding: string;
    mimeType: string;
    size: number;
    url: string;
}
