export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateStudentDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUpdateStudentDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface IStudentResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
} 