"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StudentRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeNumber = exports.StudentRepository = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const student_1 = require("./entities/student");
const util = require("util");
var Gender;
(function (Gender) {
    Gender["male"] = "Male";
    Gender["female"] = "Female";
})(Gender = exports.Gender || (exports.Gender = {}));
let StudentRepository = StudentRepository_1 = class StudentRepository extends typeorm_1.Repository {
    async createAndSave(student) {
        let stud = new student_1.Student();
        stud.Name = student.Name;
        stud.gender = student.gender;
        stud.entered = normalizeNumber(student.entered, 'Bad year entered');
        stud.grade = normalizeNumber(student.grade, 'Bad grade');
        await this.save(stud);
        return stud.Id;
    }
    async allStudents() {
        let students = await this.find();
        return students;
    }
    async findOneStudent(id) {
        let student = await this.findOne({ where: { Id: id } });
        if (!StudentRepository_1.isStudent(student)) {
            throw new Error(`Student id ${util.inspect(id)} did not retrievea student`);
        }
        return student;
    }
    async updateStudent(id, student) {
        if (typeof student.entered !== 'undefined') {
            student.entered = normalizeNumber(student.entered, 'Bad year entered');
        }
        if (typeof student.grade !== 'undefined') {
            student.grade = normalizeNumber(student.grade, 'Bad grade entered');
        }
        if (!StudentRepository_1.isStudentUpdater(student)) {
            throw new Error(`Student update id ${util.inspect(id)} did not receive a Student updater ${util.inspect(student)}`);
        }
        await this.manager.update(student_1.Student, id, student);
        return id;
    }
    async deleteStudent(student) {
        if (typeof student !== 'number' && !StudentRepository_1.isStudent(student)) {
            throw new Error('Supplied student obj not a Student');
        }
        await this.manager.delete(student_1.Student, typeof student === 'number' ? student : student.Id);
    }
    static isStudent(student) {
        return typeof student === 'object'
            && typeof student.name === 'string'
            && typeof student.entered === 'number'
            && typeof student.grade === 'number'
            && StudentRepository_1.isGender(student.gender);
    }
    static isStudentUpdater(updater) {
        let ret = true;
        if (typeof updater !== 'object') {
            throw new Error('isStudentUpdater must get object');
        }
        if (typeof updater.name !== 'undefined') {
            if (typeof updater.name !== 'string')
                ret = false;
        }
        if (typeof updater.entered !== 'undefined') {
            if (typeof updater.entered !== 'number')
                ret = false;
        }
        if (typeof updater.grade !== 'undefined') {
            if (typeof updater.grade !== 'number')
                ret = false;
        }
        if (typeof updater.gender !== 'undefined') {
            if (!StudentRepository_1.isGender(updater.gender))
                ret = false;
        }
        return ret;
    }
    static isGender(gender) {
        return typeof gender === 'string'
            && (gender === 'male' || gender === 'female');
    }
};
StudentRepository = StudentRepository_1 = __decorate([
    typeorm_1.EntityRepository(student_1.Student)
], StudentRepository);
exports.StudentRepository = StudentRepository;
function normalizeNumber(num, errorIfNotNumber) {
    if (typeof num === 'undefined') {
        throw new Error(`${errorIfNotNumber} -- ${num}`);
    }
    if (typeof num === 'number')
        return num;
    let ret = parseInt(num);
    if (isNaN(ret)) {
        throw new Error(`${errorIfNotNumber} ${ret} -- ${num}`);
    }
    return ret;
}
exports.normalizeNumber = normalizeNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZGVudFJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvU3R1ZGVudFJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFDQUFzRTtBQUN0RSxnREFBNkM7QUFDN0MsNkJBQTZCO0FBSTdCLElBQVksTUFHWDtBQUhELFdBQVksTUFBTTtJQUNkLHVCQUFhLENBQUE7SUFDYiwyQkFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBSFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBR2pCO0FBR0QsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWtCLFNBQVEsb0JBQW1CO0lBQ3RELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBZ0I7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV6RCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVztRQUNiLElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQVU7UUFDM0IsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FB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QUFRO2dCQUFFLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDdEQ7UUFDRCxJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDdkMsSUFBSSxDQUFDLG1CQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUFFLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDaEU7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQVc7UUFDdkIsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRO2VBQzFCLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUVKLENBQUE7QUFyRlksaUJBQWlCO0lBRDdCLDBCQUFnQixDQUFDLGlCQUFPLENBQUM7R0FDYixpQkFBaUIsQ0FxRjdCO0FBckZZLDhDQUFpQjtBQXVGOUIsU0FBZ0IsZUFBZSxDQUFDLEdBQW9CLEVBQUUsZ0JBQXdCO0lBQzFFLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxnQkFBZ0IsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFFeEMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLGdCQUFnQixJQUFJLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsT0FBTyxHQUFJLENBQUM7QUFDaEIsQ0FBQztBQWJELDBDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5UmVwb3NpdG9yeSwgUmVwb3NpdG9yeSwgZ2V0UmVwb3NpdG9yeSB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9lbnRpdGllcy9zdHVkZW50XCI7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEdlbmRlclR5cGUgPSBcIk1hbGVcIiB8IFwiRmVtYWxlXCI7XHJcblxyXG5leHBvcnQgZW51bSBHZW5kZXIge1xyXG4gICAgbWFsZSA9IFwiTWFsZVwiLFxyXG4gICAgZmVtYWxlID0gXCJGZW1hbGVcIlxyXG59XHJcblxyXG5ARW50aXR5UmVwb3NpdG9yeShTdHVkZW50KVxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudFJlcG9zaXRvcnkgZXh0ZW5kcyBSZXBvc2l0b3J5PFN0dWRlbnQ+IHtcclxuICAgIGFzeW5jIGNyZWF0ZUFuZFNhdmUoc3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgbGV0IHN0dWQgPSBuZXcgU3R1ZGVudCgpO1xyXG4gICAgICAgIHN0dWQuTmFtZSA9IHN0dWRlbnQuTmFtZTtcclxuICAgICAgICBzdHVkLmdlbmRlciA9IHN0dWRlbnQuZ2VuZGVyO1xyXG4gICAgICAgIHN0dWQuZW50ZXJlZCA9IG5vcm1hbGl6ZU51bWJlcihzdHVkZW50LmVudGVyZWQsICdCYWQgeWVhciBlbnRlcmVkJyk7XHJcbiAgICAgICAgc3R1ZC5ncmFkZSA9IG5vcm1hbGl6ZU51bWJlcihzdHVkZW50LmdyYWRlLCAnQmFkIGdyYWRlJyk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZShzdHVkKTtcclxuICAgICAgICByZXR1cm4gc3R1ZC5JZDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBhbGxTdHVkZW50cygpOiBQcm9taXNlPFN0dWRlbnQgW10+IHtcclxuICAgICAgICBsZXQgc3R1ZGVudHMgPSBhd2FpdCB0aGlzLmZpbmQoKTtcclxuICAgICAgICByZXR1cm4gc3R1ZGVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmluZE9uZVN0dWRlbnQoaWQ6IG51bWJlcik6IFByb21pc2U8U3R1ZGVudD4ge1xyXG4gICAgICAgIGxldCBzdHVkZW50ID0gYXdhaXQgdGhpcy5maW5kT25lKHsgd2hlcmU6IHtJZCA6IGlkfX0pO1xyXG5cclxuICAgICAgICBpZiAoIVN0dWRlbnRSZXBvc2l0b3J5LmlzU3R1ZGVudChzdHVkZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0dWRlbnQgaWQgJHt1dGlsLmluc3BlY3QoaWQpfSBkaWQgbm90IHJldHJpZXZlYSBzdHVkZW50YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3R1ZGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cGRhdGVTdHVkZW50KGlkOiBudW1iZXIsIHN0dWRlbnQ6IFN0dWRlbnQpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3R1ZGVudC5lbnRlcmVkICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZW50ZXJlZCA9IG5vcm1hbGl6ZU51bWJlcihzdHVkZW50LmVudGVyZWQsICdCYWQgeWVhciBlbnRlcmVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3R1ZGVudC5ncmFkZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5ncmFkZSA9IG5vcm1hbGl6ZU51bWJlcihzdHVkZW50LmdyYWRlLCAnQmFkIGdyYWRlIGVudGVyZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghU3R1ZGVudFJlcG9zaXRvcnkuaXNTdHVkZW50VXBkYXRlcihzdHVkZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0dWRlbnQgdXBkYXRlIGlkICR7dXRpbC5pbnNwZWN0KGlkKX0gZGlkIG5vdCByZWNlaXZlIGEgU3R1ZGVudCB1cGRhdGVyICR7dXRpbC5pbnNwZWN0KHN0dWRlbnQpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5tYW5hZ2VyLnVwZGF0ZShTdHVkZW50LCBpZCwgc3R1ZGVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZWxldGVTdHVkZW50KHN0dWRlbnQ6IG51bWJlciB8IFN0dWRlbnQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0dWRlbnQgIT09ICdudW1iZXInICYmICFTdHVkZW50UmVwb3NpdG9yeS5pc1N0dWRlbnQoc3R1ZGVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdXBwbGllZCBzdHVkZW50IG9iaiBub3QgYSBTdHVkZW50Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLm1hbmFnZXIuZGVsZXRlKFN0dWRlbnQsIHR5cGVvZiBzdHVkZW50ID09PSAnbnVtYmVyJyA/IHN0dWRlbnQgOiBzdHVkZW50LklkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNTdHVkZW50KHN0dWRlbnQ6IGFueSk6IHN0dWRlbnQgaXMgU3R1ZGVudCB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzdHVkZW50ID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICAmJiB0eXBlb2Ygc3R1ZGVudC5uYW1lID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAmJiB0eXBlb2Ygc3R1ZGVudC5lbnRlcmVkID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICAmJiB0eXBlb2Ygc3R1ZGVudC5ncmFkZSA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgJiYgU3R1ZGVudFJlcG9zaXRvcnkuaXNHZW5kZXIoc3R1ZGVudC5nZW5kZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1N0dWRlbnRVcGRhdGVyKHVwZGF0ZXI6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCByZXQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdXBkYXRlciAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc1N0dWRlbnRVcGRhdGVyIG11c3QgZ2V0IG9iamVjdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZXIubmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyLm5hbWUgIT09ICdzdHJpbmcnKSByZXQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyLmVudGVyZWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5lbnRlcmVkICE9PSAnbnVtYmVyJykgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5ncmFkZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyLmdyYWRlICE9PSAnbnVtYmVyJykgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5nZW5kZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICghU3R1ZGVudFJlcG9zaXRvcnkuaXNHZW5kZXIodXBkYXRlci5nZW5kZXIpKSByZXQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIGlzR2VuZGVyKGdlbmRlcjogYW55KTogZ2VuZGVyIGlzIEdlbmRlciB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBnZW5kZXIgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICYmIChnZW5kZXIgPT09ICdtYWxlJyB8fCBnZW5kZXIgPT09ICdmZW1hbGUnKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVOdW1iZXIobnVtOiBudW1iZXIgfCBzdHJpbmcsIGVycm9ySWZOb3ROdW1iZXI6IHN0cmluZykgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBudW0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycm9ySWZOb3ROdW1iZXJ9IC0tICR7bnVtfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykgcmV0dXJuIG51bTtcclxuXHJcbiAgICBsZXQgcmV0ID0gcGFyc2VJbnQobnVtKTtcclxuICAgIGlmKGlzTmFOKHJldCkpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJvcklmTm90TnVtYmVyfSAke3JldH0gLS0gJHtudW19YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldCE7XHJcbn1cclxuIl19