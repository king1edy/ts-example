const util = require('util');
const path = require('path');
const assert = require('chai').assert;
const { 
    connect, 
    connected,
    Student,
    getStudentRepository,
    StudentRepository,
    getOfferedClassRepository,
    OfferedClassRepository } = require('../dist/index');
    
    describe('Initialize Registrar', function() {
        before(async function() {
            try {
                await connect("registrardb.sqlite");
            } catch (e) {
                console.error(`Initialize Registrar failed with `, e);
                throw e;
            }
    });
    
    it('should successfully initialize the Registrar', async function() {
        assert.isTrue(connected());
    });
});


describe('Add students to registry', function() {
    let stud1 = {
        name: "John Brown", 
        entered: 1997,
        grade: 4,
        gender: "male"
    };
    let stud2 = {
        name: "John Brown", 
        entered: "trump1",
        grade: "senior",
        gender: "male"
    };

    let studentid1;
    let studentid2;
    
    it('should add a student to the registry', async function() {
        studentid1 = await getStudentRepository().createAndSave(stud1);

        let student = await getStudentRepository().findOneStudent(studentid1);
        
        assert.exists(student);
        assert.isObject(student);
        assert.isString(student.name);
        assert.equal(student.name, stud1.name);
        assert.isNumber(student.entered);
        assert.equal(student.entered, stud1.entered);
        assert.isNumber(student.grade);
        assert.equal(student.grade, stud1.grade);
        assert.isString(student.gender);
        assert.equal(student.gender, stud1.gender);
    });
    
    it('should fail to add a student with bad data', async function() {
        let sawError = false;
        try {
            await getStudentRepository().createAndSave(stud2);
        } catch (err) {
            sawError = true;
        }
        assert.isTrue(sawError);
    });
});