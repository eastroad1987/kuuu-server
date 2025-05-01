"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transFormFilter = exports.transFormWhereClause = exports.transFormToSQLMethod = exports.getDate = exports.DATETIME_FORMAT = exports.TIME_FORMAT = exports.DATE_FORMAT = void 0;
exports.DATE_FORMAT = "yyyy-MM-DD";
exports.TIME_FORMAT = "HH:mm:ss";
exports.DATETIME_FORMAT = `${exports.DATE_FORMAT} ${exports.TIME_FORMAT}`;
const getDate = (second) => {
    const date = new Date();
    const kTime = new Date(date.setHours(date.getHours()));
    date.setSeconds(kTime.getSeconds() + second);
    return date.toISOString();
};
exports.getDate = getDate;
const transFormToSQLMethod = (method) => {
    if (method === "eq") {
        return " = ";
    }
    else if (method === "like") {
        return " like ";
    }
};
exports.transFormToSQLMethod = transFormToSQLMethod;
const transFormWhereClause = (clause, value) => {
    let condition;
    if (clause === "like") {
        condition = "'%" + value + "%'";
    }
    else if (clause === "eq") {
        condition = `'${value}'`;
    }
    const item = `${(0, exports.transFormToSQLMethod)(clause)} ${condition}`;
    return item;
};
exports.transFormWhereClause = transFormWhereClause;
const transFormFilter = (filter) => {
    if (typeof filter === "string") {
        return [filter];
    }
    else {
        return filter;
    }
};
exports.transFormFilter = transFormFilter;
//# sourceMappingURL=parseMethod.js.map