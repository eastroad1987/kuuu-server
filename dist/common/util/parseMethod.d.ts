export declare const DATE_FORMAT = "yyyy-MM-DD";
export declare const TIME_FORMAT = "HH:mm:ss";
export declare const DATETIME_FORMAT = "yyyy-MM-DD HH:mm:ss";
export declare const getDate: (second: number) => string;
export declare const transFormToSQLMethod: (method: string) => " = " | " like ";
export declare const transFormWhereClause: (clause: string, value: any) => string;
export declare const transFormFilter: (filter: any) => any;
