import { Repository } from "typeorm/repository/Repository";
export declare const checkLikeCompany: (data: any, repository: Repository<any>, jsonProperty: string[], targetProperty: string[], jobSeekerId: number) => Promise<void>;
export declare const checkScrapJobPosting: (data: any, repository: Repository<any>, jsonProperty: string[], targetProperty: string[], jobSeekerId: number) => Promise<void>;
export declare const checkSingleUserImageUrl: (data: any, repository: Repository<any>) => Promise<void>;
export declare const checkUserImageUrl: (data: any, repository: Repository<any>) => Promise<void>;
