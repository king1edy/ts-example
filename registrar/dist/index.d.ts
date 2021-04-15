import "reflect-metadata";
export { Student } from "./entities/Student";
export { OfferedClass } from "./entities/OfferedClass";
import { StudentRepository } from "./StudentRepository";
export { StudentRepository } from "./StudentRepository";
import { OfferedClassRepository } from "./OfferedClassRepository";
export { OfferedClassRepository } from "./OfferedClassRepository";
export declare function conncet(databaseFN: string): Promise<void>;
export declare function connected(): boolean;
export declare function getStudentRepository(): StudentRepository;
export declare function getOfferedClassRepository(): OfferedClassRepository;
//# sourceMappingURL=index.d.ts.map