"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OfferedClassRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedClassRepository = void 0;
const typeorm_1 = require("typeorm");
const OfferedClass_1 = require("./entities/OfferedClass");
const StudentRepository_1 = require("./StudentRepository");
const index_1 = require("./index");
const util = require("util");
const yaml = require("js-yaml");
const fs = require("fs-extra");
let OfferedClassRepository = OfferedClassRepository_1 = class OfferedClassRepository extends typeorm_1.Repository {
    async createAndSave(offeredClass) {
        let cls = new OfferedClass_1.OfferedClass();
        cls.code = offeredClass.code;
        cls.name = offeredClass.name;
        cls.hours = StudentRepository_1.normalizeNumber(offeredClass.hours, 'Bad number of hours');
        if (!OfferedClassRepository_1.isOfferedClass(cls)) {
            throw new Error(`Not an offered class ${util.inspect(offeredClass)}`);
        }
        await this.save(cls);
        return cls.code;
    }
    async findOneClass(code) {
        let cls = await this.findOne({
            where: { code: code },
            relations: ["students"]
        });
        if (!OfferedClassRepository_1.isOfferedClass(cls)) {
            throw new Error(`OfferedClass id ${util.inspect(code)} did not retrieve a OfferedClass`);
        }
        return cls;
    }
    async updateOfferedClass(code, offeredClass) {
        if (typeof offeredClass.hours !== 'undefined') {
            offeredClass.hours = StudentRepository_1.normalizeNumber(offeredClass.hours, 'Bad number of hours');
        }
        if (!OfferedClassRepository_1.isOfferedClassUpdater(offeredClass)) {
            throw new Error(`OfferedClass update id ${util.inspect(code)} did not receive a OfferedClass updater ${util.inspect(offeredClass)}`);
        }
        await this.manager.update(OfferedClass_1.OfferedClass, code, offeredClass);
        return code;
    }
    async deleteOfferedClass(offeredClass) {
        if (typeof offeredClass !== 'string' && !OfferedClassRepository_1.isOfferedClass(offeredClass)) {
            throw new Error('Supplied offeredClass object not a OfferedClass');
        }
        await this.manager.delete(OfferedClass_1.OfferedClass, typeof offeredClass === 'string' ? offeredClass : offeredClass.code);
    }
    async enrollStudentInClass(studentid, code) {
        let offered = await this.findOneClass(code);
        if (!OfferedClassRepository_1.isOfferedClass(offered)) {
            throw new Error(`enrollStudentInClass did not find OfferedClass for ${util.inspect(code)}`);
        }
        let student = await index_1.getStudentRepository().findOneStudent(studentid);
        if (!StudentRepository_1.StudentRepository.isStudent(student)) {
            throw new Error(`enrollStudentInClass did not find Student for ${util.inspect(studentid)}`);
        }
        if (!student.classes)
            student.classes = [];
        student.classes.push(offered);
        await index_1.getStudentRepository().manager.save(student);
    }
    async updateStudentEnrolledClasses(studentid, codes) {
        let student = await index_1.getStudentRepository().findOneStudent(studentid);
        if (!StudentRepository_1.StudentRepository.isStudent(student)) {
            throw new Error(`enrollStudentInClass did not find Student for ${util.inspect(studentid)}`);
        }
        let newclasses = [];
        for (let sclazz of student.classes) {
            for (let code of codes) {
                if (sclazz.code === code) {
                    newclasses.push(sclazz);
                }
            }
        }
        for (let code of codes) {
            let found = false;
            for (let nclazz of newclasses) {
                if (nclazz.code === code) {
                    found = true;
                }
            }
            if (!found) {
                newclasses.push(await this.findOneClass(code));
            }
        }
        student.classes = newclasses;
        await index_1.getStudentRepository().save(student);
    }
    async updateClasses(classFN) {
        const yamlText = await fs.readFile(classFN, 'utf8');
        const offered = yaml.safeLoad(yamlText);
        if (typeof offered !== 'object' || !Array.isArray(offered.classes)) {
            throw new Error(`updateClasses read incorrect data file from ${classFN}`);
        }
        let all = await this.allClasses();
        for (let cls of all) {
            let stillOffered = false;
            for (let ofrd of offered.classes) {
                if (ofrd.code === cls.code) {
                    stillOffered = true;
                    break;
                }
            }
            if (!stillOffered) {
                this.deleteOfferedClass(cls.code);
            }
        }
        for (let updater of offered.classes) {
            if (!OfferedClassRepository_1.isOfferedClassUpdater(updater)) {
                throw new Error(`updateClasses found classes entry that is not an OfferedClassUpdater ${util.inspect(updater)}`);
            }
            let cls;
            try {
                cls = await this.findOneClass(updater.code);
            }
            catch (e) {
                cls = undefined;
            }
            if (cls) {
                await this.updateOfferedClass(updater.code, updater);
            }
            else {
                await this.createAndSave(updater);
            }
        }
    }
    static isOfferedClass(offeredClass) {
        return typeof offeredClass === 'object'
            && typeof offeredClass.code === 'string'
            && typeof offeredClass.name === 'string'
            && typeof offeredClass.hours === 'number';
    }
    static isOfferedClassUpdater(updater) {
        let ret = true;
        if (typeof updater !== 'object') {
            throw new Error('isOfferedClassUpdater must get object');
        }
        if (typeof updater.code !== 'undefined') {
            if (typeof updater.code !== 'string')
                ret = false;
        }
        if (typeof updater.name !== 'undefined') {
            if (typeof updater.name !== 'string')
                ret = false;
        }
        if (typeof updater.hours !== 'undefined') {
            if (typeof updater.hours !== 'number')
                ret = false;
        }
        return ret;
    }
    async allClasses() {
        let classes = await this.find({
            relations: ["students"]
        });
        return classes;
    }
};
OfferedClassRepository = OfferedClassRepository_1 = __decorate([
    typeorm_1.EntityRepository(OfferedClass_1.OfferedClass)
], OfferedClassRepository);
exports.OfferedClassRepository = OfferedClassRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJlZENsYXNzUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9PZmZlcmVkQ2xhc3NSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBc0U7QUFDdEUsMERBQXVEO0FBQ3ZELDJEQUF5RTtBQUN6RSxtQ0FBK0M7QUFDL0MsNkJBQTZCO0FBQzdCLGdDQUFnQztBQUNoQywrQkFBK0I7QUFHL0IsSUFBYSxzQkFBc0IsOEJBQW5DLE1BQWEsc0JBQXVCLFNBQVEsb0JBQXdCO0lBQ2hFLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBMEI7UUFDMUMsSUFBSSxHQUFHLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUM3QixHQUFHLENBQUMsS0FBSyxHQUFHLG1DQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyx3QkFBc0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekU7UUFFRCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDM0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDckIsU0FBUyxFQUFFLENBQUUsVUFBVSxDQUFFO1NBQzVC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QixDQXVKbEM7QUF2Slksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5UmVwb3NpdG9yeSwgUmVwb3NpdG9yeSwgZ2V0UmVwb3NpdG9yeSB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IE9mZmVyZWRDbGFzcyB9IGZyb20gJy4vZW50aXRpZXMvT2ZmZXJlZENsYXNzJztcclxuaW1wb3J0IHsgbm9ybWFsaXplTnVtYmVyLCBTdHVkZW50UmVwb3NpdG9yeSB9IGZyb20gJy4vU3R1ZGVudFJlcG9zaXRvcnknO1xyXG5pbXBvcnQgeyBnZXRTdHVkZW50UmVwb3NpdG9yeSB9IGZyb20gJy4vaW5kZXgnO1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQgKiBhcyB5YW1sIGZyb20gJ2pzLXlhbWwnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XHJcblxyXG5ARW50aXR5UmVwb3NpdG9yeShPZmZlcmVkQ2xhc3MpXHJcbmV4cG9ydCBjbGFzcyBPZmZlcmVkQ2xhc3NSZXBvc2l0b3J5IGV4dGVuZHMgUmVwb3NpdG9yeTxPZmZlcmVkQ2xhc3M+IHtcclxuICAgIGFzeW5jIGNyZWF0ZUFuZFNhdmUob2ZmZXJlZENsYXNzOiBPZmZlcmVkQ2xhc3MpIDogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgY2xzID0gbmV3IE9mZmVyZWRDbGFzcygpO1xyXG4gICAgICAgIGNscy5jb2RlID0gb2ZmZXJlZENsYXNzLmNvZGU7XHJcbiAgICAgICAgY2xzLm5hbWUgPSBvZmZlcmVkQ2xhc3MubmFtZTtcclxuICAgICAgICBjbHMuaG91cnMgPSBub3JtYWxpemVOdW1iZXIob2ZmZXJlZENsYXNzLmhvdXJzLCAnQmFkIG51bWJlciBvZiBob3VycycpO1xyXG4gICAgICAgIGlmICghT2ZmZXJlZENsYXNzUmVwb3NpdG9yeS5pc09mZmVyZWRDbGFzcyhjbHMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGFuIG9mZmVyZWQgY2xhc3MgJHt1dGlsLmluc3BlY3Qob2ZmZXJlZENsYXNzKX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZShjbHMpO1xyXG4gICAgICAgIHJldHVybiBjbHMuY29kZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmaW5kT25lQ2xhc3MoY29kZTogc3RyaW5nKSA6IFByb21pc2U8T2ZmZXJlZENsYXNzPiB7XHJcbiAgICAgICAgbGV0IGNscyA9IGF3YWl0IHRoaXMuZmluZE9uZSh7IFxyXG4gICAgICAgICAgICB3aGVyZTogeyBjb2RlOiBjb2RlIH0sXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogWyBcInN0dWRlbnRzXCIgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghT2ZmZXJlZENsYXNzUmVwb3NpdG9yeS5pc09mZmVyZWRDbGFzcyhjbHMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT2ZmZXJlZENsYXNzIGlkICR7dXRpbC5pbnNwZWN0KGNvZGUpfSBkaWQgbm90IHJldHJpZXZlIGEgT2ZmZXJlZENsYXNzYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbHM7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdXBkYXRlT2ZmZXJlZENsYXNzKGNvZGU6IHN0cmluZywgb2ZmZXJlZENsYXNzOiBPZmZlcmVkQ2xhc3MpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJlZENsYXNzLmhvdXJzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBvZmZlcmVkQ2xhc3MuaG91cnMgPSBub3JtYWxpemVOdW1iZXIob2ZmZXJlZENsYXNzLmhvdXJzLCAnQmFkIG51bWJlciBvZiBob3VycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3NVcGRhdGVyKG9mZmVyZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPZmZlcmVkQ2xhc3MgdXBkYXRlIGlkICR7dXRpbC5pbnNwZWN0KGNvZGUpfSBkaWQgbm90IHJlY2VpdmUgYSBPZmZlcmVkQ2xhc3MgdXBkYXRlciAke3V0aWwuaW5zcGVjdChvZmZlcmVkQ2xhc3MpfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCB0aGlzLm1hbmFnZXIudXBkYXRlKE9mZmVyZWRDbGFzcywgY29kZSwgb2ZmZXJlZENsYXNzKTtcclxuICAgICAgICByZXR1cm4gY29kZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZWxldGVPZmZlcmVkQ2xhc3Mob2ZmZXJlZENsYXNzOiBzdHJpbmcgfCBPZmZlcmVkQ2xhc3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG9mZmVyZWRDbGFzcyAhPT0gJ3N0cmluZycgJiYgIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3Mob2ZmZXJlZENsYXNzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1cHBsaWVkIG9mZmVyZWRDbGFzcyBvYmplY3Qgbm90IGEgT2ZmZXJlZENsYXNzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHRoaXMubWFuYWdlci5kZWxldGUoT2ZmZXJlZENsYXNzLCB0eXBlb2Ygb2ZmZXJlZENsYXNzID09PSAnc3RyaW5nJyA/IG9mZmVyZWRDbGFzcyA6IG9mZmVyZWRDbGFzcy5jb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBlbnJvbGxTdHVkZW50SW5DbGFzcyhzdHVkZW50aWQ6IGFueSwgY29kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG9mZmVyZWQgPSBhd2FpdCB0aGlzLmZpbmRPbmVDbGFzcyhjb2RlKTtcclxuICAgICAgICBpZiAoIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3Mob2ZmZXJlZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbnJvbGxTdHVkZW50SW5DbGFzcyBkaWQgbm90IGZpbmQgT2ZmZXJlZENsYXNzIGZvciAke3V0aWwuaW5zcGVjdChjb2RlKX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0dWRlbnQgPSBhd2FpdCBnZXRTdHVkZW50UmVwb3NpdG9yeSgpLmZpbmRPbmVTdHVkZW50KHN0dWRlbnRpZCk7XHJcbiAgICAgICAgaWYgKCFTdHVkZW50UmVwb3NpdG9yeS5pc1N0dWRlbnQoc3R1ZGVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbnJvbGxTdHVkZW50SW5DbGFzcyBkaWQgbm90IGZpbmQgU3R1ZGVudCBmb3IgJHt1dGlsLmluc3BlY3Qoc3R1ZGVudGlkKX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFzdHVkZW50LmNsYXNzZXMpIHN0dWRlbnQuY2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIHN0dWRlbnQuY2xhc3Nlcy5wdXNoKG9mZmVyZWQpO1xyXG4gICAgICAgIGF3YWl0IGdldFN0dWRlbnRSZXBvc2l0b3J5KCkubWFuYWdlci5zYXZlKHN0dWRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwZGF0ZVN0dWRlbnRFbnJvbGxlZENsYXNzZXMoc3R1ZGVudGlkOiBhbnksIGNvZGVzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGxldCBzdHVkZW50ID0gYXdhaXQgZ2V0U3R1ZGVudFJlcG9zaXRvcnkoKS5maW5kT25lU3R1ZGVudChzdHVkZW50aWQpO1xyXG4gICAgICAgIGlmICghU3R1ZGVudFJlcG9zaXRvcnkuaXNTdHVkZW50KHN0dWRlbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZW5yb2xsU3R1ZGVudEluQ2xhc3MgZGlkIG5vdCBmaW5kIFN0dWRlbnQgZm9yICR7dXRpbC5pbnNwZWN0KHN0dWRlbnRpZCl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdjbGFzc2VzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgc2NsYXp6IG9mIHN0dWRlbnQuY2xhc3Nlcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2RlIG9mIGNvZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NsYXp6LmNvZGUgPT09IGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdjbGFzc2VzLnB1c2goc2NsYXp6KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBjb2RlIG9mIGNvZGVzKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuY2xhenogb2YgbmV3Y2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5jbGF6ei5jb2RlID09PSBjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcclxuICAgICAgICAgICAgICAgIG5ld2NsYXNzZXMucHVzaChhd2FpdCB0aGlzLmZpbmRPbmVDbGFzcyhjb2RlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3R1ZGVudC5jbGFzc2VzID0gbmV3Y2xhc3NlcztcclxuICAgICAgICBhd2FpdCBnZXRTdHVkZW50UmVwb3NpdG9yeSgpLnNhdmUoc3R1ZGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdXBkYXRlQ2xhc3NlcyhjbGFzc0ZOOiBzdHJpbmcpIHtjb25zdCB5YW1sVGV4dCA9IGF3YWl0IGZzLnJlYWRGaWxlKGNsYXNzRk4sICd1dGY4Jyk7XHJcbiAgICAgICAgY29uc3Qgb2ZmZXJlZCA9IHlhbWwuc2FmZUxvYWQoeWFtbFRleHQpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJlZCAhPT0gJ29iamVjdCcgfHwgIUFycmF5LmlzQXJyYXkob2ZmZXJlZC5jbGFzc2VzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVwZGF0ZUNsYXNzZXMgcmVhZCBpbmNvcnJlY3QgZGF0YSBmaWxlIGZyb20gJHtjbGFzc0ZOfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWxsID0gYXdhaXQgdGhpcy5hbGxDbGFzc2VzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgY2xzIG9mIGFsbCkge1xyXG4gICAgICAgICAgICBsZXQgc3RpbGxPZmZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG9mcmQgb2Ygb2ZmZXJlZC5jbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2ZyZC5jb2RlID09PSBjbHMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0aWxsT2ZmZXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdGlsbE9mZmVyZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlT2ZmZXJlZENsYXNzKGNscy5jb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB1cGRhdGVyIG9mIG9mZmVyZWQuY2xhc3Nlcykge1xyXG4gICAgICAgICAgICBpZiAoIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3NVcGRhdGVyKHVwZGF0ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVwZGF0ZUNsYXNzZXMgZm91bmQgY2xhc3NlcyBlbnRyeSB0aGF0IGlzIG5vdCBhbiBPZmZlcmVkQ2xhc3NVcGRhdGVyICR7dXRpbC5pbnNwZWN0KHVwZGF0ZXIpfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjbHM7XHJcbiAgICAgICAgICAgIHRyeSB7IFxyXG4gICAgICAgICAgICAgICAgY2xzID0gYXdhaXQgdGhpcy5maW5kT25lQ2xhc3ModXBkYXRlci5jb2RlKTsgXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgY2xzID0gdW5kZWZpbmVkIH1cclxuICAgICAgICAgICAgaWYgKGNscykge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVPZmZlcmVkQ2xhc3ModXBkYXRlci5jb2RlLCB1cGRhdGVyKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVBbmRTYXZlKHVwZGF0ZXIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBpc09mZmVyZWRDbGFzcyhvZmZlcmVkQ2xhc3M6IGFueSk6IG9mZmVyZWRDbGFzcyBpcyBPZmZlcmVkQ2xhc3Mge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2ZmZXJlZENsYXNzID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICAmJiB0eXBlb2Ygb2ZmZXJlZENsYXNzLmNvZGUgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiBvZmZlcmVkQ2xhc3MubmFtZSA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgJiYgdHlwZW9mIG9mZmVyZWRDbGFzcy5ob3VycyA9PT0gJ251bWJlcic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBpc09mZmVyZWRDbGFzc1VwZGF0ZXIodXBkYXRlcjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHJldCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzT2ZmZXJlZENsYXNzVXBkYXRlciBtdXN0IGdldCBvYmplY3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyLmNvZGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5jb2RlICE9PSAnc3RyaW5nJykgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5uYW1lICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZXIubmFtZSAhPT0gJ3N0cmluZycpIHJldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZXIuaG91cnMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5ob3VycyAhPT0gJ251bWJlcicpIHJldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGFsbENsYXNzZXMoKTogUHJvbWlzZTxPZmZlcmVkQ2xhc3MgW10+IHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGF3YWl0IHRoaXMuZmluZCh7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogWyBcInN0dWRlbnRzXCIgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgfVxyXG59Il19