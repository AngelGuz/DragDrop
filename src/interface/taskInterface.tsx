import { ColumnType } from "../utils/models";

export interface TaskModel {
    id: string;
    title: string;
    column: ColumnType;
    color: string;
}