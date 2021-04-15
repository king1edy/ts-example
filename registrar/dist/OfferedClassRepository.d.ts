import { Repository } from "typeorm";
import { OfferedClass } from './entities/OfferedClass';
export declare class OfferedClassRepository extends Repository<OfferedClass> {
    createAndSave(offeredClass: OfferedClass): Promise<any>;
    findOneClass(code: string): Promise<OfferedClass>;
    updateOfferedClass(code: string, offeredClass: OfferedClass): Promise<any>;
    deleteOfferedClass(offeredClass: string | OfferedClass): Promise<void>;
    enrollStudentInClass(studentid: any, code: string): Promise<void>;
    updateStudentEnrolledClasses(studentid: any, codes: string[]): Promise<void>;
    updateClasses(classFN: string): Promise<void>;
    static isOfferedClass(offeredClass: any): offeredClass is OfferedClass;
    static isOfferedClassUpdater(updater: any): boolean;
    allClasses(): Promise<OfferedClass[]>;
}
//# sourceMappingURL=OfferedClassRepository.d.ts.map