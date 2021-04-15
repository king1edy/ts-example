import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { OfferedClass } from "./OfferedClass";

@Entity()
export class Student {
    @PrimaryGeneratedColumn() Id: number;
    @Column({ length: 100 }) Name: string;
    @Column("int") entered: number;
    @Column("int") grade: number
    @Column() gender: string;
    
    @ManyToMany(() => OfferedClass, oclass => oclass.students)
    @JoinTable() classes: OfferedClass[];
}