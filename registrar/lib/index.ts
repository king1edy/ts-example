import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Student } from "./entities/Student";
export { Student } from "./entities/Student";
import { OfferedClass } from "./entities/OfferedClass";
export { OfferedClass } from "./entities/OfferedClass";
import { StudentRepository } from "./StudentRepository";
export { StudentRepository } from "./StudentRepository";
import { OfferedClassRepository } from "./OfferedClassRepository";
export { OfferedClassRepository } from "./OfferedClassRepository";

let _connection: Connection;

export async function conncet(databaseFN: string) {
    _connection = await createConnection ({
        type: "sqlite",
        database: databaseFN,
        synchronize: true,
        logging: false,
        entities: [
            Student, OfferedClass
        ]
    });
}

export function connected () {
    return typeof _connection !== 'undefined';
}

export function getStudentRepository () : StudentRepository {
    return _connection.getCustomRepository(StudentRepository);
}

export function getOfferedClassRepository() : OfferedClassRepository {
    return _connection.getCustomRepository(OfferedClassRepository);
}