"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfferedClassRepository = exports.getStudentRepository = exports.connected = exports.conncet = exports.OfferedClassRepository = exports.StudentRepository = exports.OfferedClass = exports.Student = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Student_1 = require("./entities/Student");
var Student_2 = require("./entities/Student");
Object.defineProperty(exports, "Student", { enumerable: true, get: function () { return Student_2.Student; } });
const OfferedClass_1 = require("./entities/OfferedClass");
var OfferedClass_2 = require("./entities/OfferedClass");
Object.defineProperty(exports, "OfferedClass", { enumerable: true, get: function () { return OfferedClass_2.OfferedClass; } });
const StudentRepository_1 = require("./StudentRepository");
var StudentRepository_2 = require("./StudentRepository");
Object.defineProperty(exports, "StudentRepository", { enumerable: true, get: function () { return StudentRepository_2.StudentRepository; } });
const OfferedClassRepository_1 = require("./OfferedClassRepository");
var OfferedClassRepository_2 = require("./OfferedClassRepository");
Object.defineProperty(exports, "OfferedClassRepository", { enumerable: true, get: function () { return OfferedClassRepository_2.OfferedClassRepository; } });
let _connection;
async function conncet(databaseFN) {
    _connection = await typeorm_1.createConnection({
        type: "sqlite",
        database: databaseFN,
        synchronize: true,
        logging: false,
        entities: [
            Student_1.Student, OfferedClass_1.OfferedClass
        ]
    });
}
exports.conncet = conncet;
function connected() {
    return typeof _connection !== 'undefined';
}
exports.connected = connected;
function getStudentRepository() {
    return _connection.getCustomRepository(StudentRepository_1.StudentRepository);
}
exports.getStudentRepository = getStudentRepository;
function getOfferedClassRepository() {
    return _connection.getCustomRepository(OfferedClassRepository_1.OfferedClassRepository);
}
exports.getOfferedClassRepository = getOfferedClassRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTBCO0FBQzFCLHFDQUF1RDtBQUN2RCxnREFBNkM7QUFDN0MsOENBQTZDO0FBQXBDLGtHQUFBLE9BQU8sT0FBQTtBQUNoQiwwREFBdUQ7QUFDdkQsd0RBQXVEO0FBQTlDLDRHQUFBLFlBQVksT0FBQTtBQUNyQiwyREFBd0Q7QUFDeEQseURBQXdEO0FBQS9DLHNIQUFBLGlCQUFpQixPQUFBO0FBQzFCLHFFQUFrRTtBQUNsRSxtRUFBa0U7QUFBekQsZ0lBQUEsc0JBQXNCLE9BQUE7QUFFL0IsSUFBSSxXQUF1QixDQUFDO0FBRXJCLEtBQUssVUFBVSxPQUFPLENBQUMsVUFBa0I7SUFDNUMsV0FBVyxHQUFHLE1BQU0sMEJBQWdCLENBQUU7UUFDbEMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRTtZQUNOLGlCQUFPLEVBQUUsMkJBQVk7U0FDeEI7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsMEJBVUM7QUFFRCxTQUFnQixTQUFTO0lBQ3JCLE9BQU8sT0FBTyxXQUFXLEtBQUssV0FBVyxDQUFDO0FBQzlDLENBQUM7QUFGRCw4QkFFQztBQUVELFNBQWdCLG9CQUFvQjtJQUNoQyxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxxQ0FBaUIsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFGRCxvREFFQztBQUVELFNBQWdCLHlCQUF5QjtJQUNyQyxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQywrQ0FBc0IsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFGRCw4REFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcclxuaW1wb3J0IHsgY3JlYXRlQ29ubmVjdGlvbiwgQ29ubmVjdGlvbiB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9lbnRpdGllcy9TdHVkZW50XCI7XHJcbmV4cG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9lbnRpdGllcy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IE9mZmVyZWRDbGFzcyB9IGZyb20gXCIuL2VudGl0aWVzL09mZmVyZWRDbGFzc1wiO1xyXG5leHBvcnQgeyBPZmZlcmVkQ2xhc3MgfSBmcm9tIFwiLi9lbnRpdGllcy9PZmZlcmVkQ2xhc3NcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFJlcG9zaXRvcnkgfSBmcm9tIFwiLi9TdHVkZW50UmVwb3NpdG9yeVwiO1xyXG5leHBvcnQgeyBTdHVkZW50UmVwb3NpdG9yeSB9IGZyb20gXCIuL1N0dWRlbnRSZXBvc2l0b3J5XCI7XHJcbmltcG9ydCB7IE9mZmVyZWRDbGFzc1JlcG9zaXRvcnkgfSBmcm9tIFwiLi9PZmZlcmVkQ2xhc3NSZXBvc2l0b3J5XCI7XHJcbmV4cG9ydCB7IE9mZmVyZWRDbGFzc1JlcG9zaXRvcnkgfSBmcm9tIFwiLi9PZmZlcmVkQ2xhc3NSZXBvc2l0b3J5XCI7XHJcblxyXG5sZXQgX2Nvbm5lY3Rpb246IENvbm5lY3Rpb247XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmNldChkYXRhYmFzZUZOOiBzdHJpbmcpIHtcclxuICAgIF9jb25uZWN0aW9uID0gYXdhaXQgY3JlYXRlQ29ubmVjdGlvbiAoe1xyXG4gICAgICAgIHR5cGU6IFwic3FsaXRlXCIsXHJcbiAgICAgICAgZGF0YWJhc2U6IGRhdGFiYXNlRk4sXHJcbiAgICAgICAgc3luY2hyb25pemU6IHRydWUsXHJcbiAgICAgICAgbG9nZ2luZzogZmFsc2UsXHJcbiAgICAgICAgZW50aXRpZXM6IFtcclxuICAgICAgICAgICAgU3R1ZGVudCwgT2ZmZXJlZENsYXNzXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25uZWN0ZWQgKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBfY29ubmVjdGlvbiAhPT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHVkZW50UmVwb3NpdG9yeSAoKSA6IFN0dWRlbnRSZXBvc2l0b3J5IHtcclxuICAgIHJldHVybiBfY29ubmVjdGlvbi5nZXRDdXN0b21SZXBvc2l0b3J5KFN0dWRlbnRSZXBvc2l0b3J5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZmVyZWRDbGFzc1JlcG9zaXRvcnkoKSA6IE9mZmVyZWRDbGFzc1JlcG9zaXRvcnkge1xyXG4gICAgcmV0dXJuIF9jb25uZWN0aW9uLmdldEN1c3RvbVJlcG9zaXRvcnkoT2ZmZXJlZENsYXNzUmVwb3NpdG9yeSk7XHJcbn0iXX0=