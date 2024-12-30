export const DATE_FORMAT = "yyyy-MM-DD";
export const TIME_FORMAT = "HH:mm:ss";

export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

// type DateFormat = "YYYY-MM-DD" | "YYYY-M-DD" | "YYYY-MM-D";

export const getDate = (second: number) => {
  const date = new Date();
  // const kTime: Date = new Date(date.setHours(date.getHours() + 9));
  const kTime: Date = new Date(date.setHours(date.getHours()));
  date.setSeconds(kTime.getSeconds() + second);
  return date.toISOString();
};

export const transFormToSQLMethod = (method: string) => {
  if (method === "eq") {
    return " = ";
  } else if (method === "like") {
    return " like ";
  }
};
export const transFormWhereClause = (clause: string, value: any) => {
  let condition;
  if (clause === "like") {
    condition = "'%" + value + "%'";
  } else if (clause === "eq") {
    condition = `'${value}'`;
  }
  const item = `${transFormToSQLMethod(clause)} ${condition}`;
  return item;
};

export const transFormFilter = (filter) => {
  if (typeof filter === "string") {
    return [filter];
  } else {
    return filter;
  }
};
