import { Repository } from "typeorm";
import { Student } from "./entities/student";
export declare type GenderType = "Male" | "Female";
export declare enum Gender {
    male = "Male",
    female = "Female"
}
export declare class StudentRepository extends Repository<Student> {
    createAndSave(student: Student): Promise<number>;
    allStudents(): Promise<Student[]>;
    findOneStudent(id: number): Promise<Student>;
    updateStudent(id: number, student: Student): Promise<number>;
    deleteStudent(student: number | Student): Promise<void>;
    static isStudent(student: any): student is Student;
    static isStudentUpdater(updater: any): boolean;
    static isGender(gender: any): gender is Gender;
}
export declare function normalizeNumber(num: number | string, errorIfNotNumber: string): number;
//# sourceMappingURL=StudentRepository.d.ts.map