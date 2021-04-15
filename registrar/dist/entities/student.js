"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const OfferedClass_1 = require("./OfferedClass");
let Student = class Student {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "Id", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], Student.prototype, "Name", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Student.prototype, "entered", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Student.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    typeorm_1.ManyToMany(() => OfferedClass_1.OfferedClass, oclass => oclass.students),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Student.prototype, "classes", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lbnRpdGllcy9zdHVkZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF3RjtBQUN4RixpREFBOEM7QUFHOUMsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztDQVNuQixDQUFBO0FBUjZCO0lBQXpCLGdDQUFzQixFQUFFOzttQ0FBWTtBQUNaO0lBQXhCLGdCQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O3FDQUFjO0FBQ3ZCO0lBQWQsZ0JBQU0sQ0FBQyxLQUFLLENBQUM7O3dDQUFpQjtBQUNoQjtJQUFkLGdCQUFNLENBQUMsS0FBSyxDQUFDOztzQ0FBYztBQUNsQjtJQUFULGdCQUFNLEVBQUU7O3VDQUFnQjtBQUdaO0lBRFosb0JBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywyQkFBWSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN6RCxtQkFBUyxFQUFFOzt3Q0FBeUI7QUFSNUIsT0FBTztJQURuQixnQkFBTSxFQUFFO0dBQ0ksT0FBTyxDQVNuQjtBQVRZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBDb2x1bW4sIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIE1hbnlUb01hbnksIEpvaW5UYWJsZSB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IE9mZmVyZWRDbGFzcyB9IGZyb20gXCIuL09mZmVyZWRDbGFzc1wiO1xyXG5cclxuQEVudGl0eSgpXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50IHtcclxuICAgIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKCkgSWQ6IG51bWJlcjtcclxuICAgIEBDb2x1bW4oeyBsZW5ndGg6IDEwMCB9KSBOYW1lOiBzdHJpbmc7XHJcbiAgICBAQ29sdW1uKFwiaW50XCIpIGVudGVyZWQ6IG51bWJlcjtcclxuICAgIEBDb2x1bW4oXCJpbnRcIikgZ3JhZGU6IG51bWJlclxyXG4gICAgQENvbHVtbigpIGdlbmRlcjogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBATWFueVRvTWFueSgoKSA9PiBPZmZlcmVkQ2xhc3MsIG9jbGFzcyA9PiBvY2xhc3Muc3R1ZGVudHMpXHJcbiAgICBASm9pblRhYmxlKCkgY2xhc3NlczogT2ZmZXJlZENsYXNzW107XHJcbn0iXX0=