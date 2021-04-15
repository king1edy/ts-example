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
exports.OfferedClass = void 0;
const typeorm_1 = require("typeorm");
const student_1 = require("./student");
let OfferedClass = class OfferedClass {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 10 }),
    __metadata("design:type", String)
], OfferedClass.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], OfferedClass.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], OfferedClass.prototype, "hours", void 0);
__decorate([
    typeorm_1.ManyToMany(type => student_1.Student, student => student.classes),
    __metadata("design:type", Array)
], OfferedClass.prototype, "students", void 0);
OfferedClass = __decorate([
    typeorm_1.Entity()
], OfferedClass);
exports.OfferedClass = OfferedClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJlZENsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VudGl0aWVzL09mZmVyZWRDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBK0U7QUFDL0UsdUNBQW9DO0FBR3BDLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FPeEIsQ0FBQTtBQU5tQztJQUEvQix1QkFBYSxDQUFDLEVBQUUsTUFBTSxFQUFHLEVBQUUsRUFBRSxDQUFDOzswQ0FBYztBQUNwQjtJQUF4QixnQkFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzswQ0FBYztBQUN2QjtJQUFkLGdCQUFNLENBQUMsS0FBSyxDQUFDOzsyQ0FBZTtBQUc3QjtJQURDLG9CQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7OENBQ3BDO0FBTlgsWUFBWTtJQUR4QixnQkFBTSxFQUFFO0dBQ0ksWUFBWSxDQU94QjtBQVBZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBDb2x1bW4sIFByaW1hcnlDb2x1bW4sIE1hbnlUb01hbnksIEpvaW5UYWJsZSB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9zdHVkZW50XCI7XHJcblxyXG5ARW50aXR5KClcclxuZXhwb3J0IGNsYXNzIE9mZmVyZWRDbGFzcyB7XHJcbiAgICBAUHJpbWFyeUNvbHVtbih7IGxlbmd0aCA6IDEwIH0pIGNvZGU6IHN0cmluZztcclxuICAgIEBDb2x1bW4oeyBsZW5ndGg6IDEwMCB9KSBuYW1lOiBzdHJpbmc7XHJcbiAgICBAQ29sdW1uKFwiaW50XCIpIGhvdXJzOiBudW1iZXI7XHJcblxyXG4gICAgQE1hbnlUb01hbnkodHlwZSA9PiBTdHVkZW50LCBzdHVkZW50ID0+IHN0dWRlbnQuY2xhc3NlcylcclxuICAgIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbn0iXX0=