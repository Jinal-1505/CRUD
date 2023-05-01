// const fs = require('fs');
import fs from "fs";
import inquirer from "inquirer";

const file = 'db.json';

//file not exist then create one
let read = [];
if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]');
}
else if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, 'utf8');
    if (data) {
        try {
            read = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON data:', err);
            process.exit(1);
        }
    }
}


//read file
// const read = JSON.parse(fs.readFileSync(file));

//functionality to perform
inquirer
    .prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'Select operation which you want to perform :',
            choices: ['Read File data', 'Add file data', 'Update file data', 'Delete file data'],
        },
    ])
    .then(({ operation }) => {
        switch (operation) {
            case 'Read File data':
                readData();
                break;
            case 'Add file data':
                addData();
                break;
            case 'Update file data':
                updateData();
                break;
            case 'Delete file data':
                removeData();
                break;
        }
    });

// View data
function readData() {
    console.log(read);
}

// Add new data to the database
function addData() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter name:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter email:',
            },
            {
                type: 'number',
                name: 'age',
                message: 'Enter age:',
            },
        ])
        .then(({ name, email, age }) => {
            read.push({ name, email, age });
            fs.writeFileSync(file, JSON.stringify(read, null, 2));
            console.log('Data added successfully.....!!!!!!');
        });
}

//update
function updateData() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter name which data u want to update : ',
            },
            // {
            //     type: 'input',
            //     name: 'email',
            //     message: 'Enter new emailid : '
            // },
            {
                type: 'input',
                name: 'age',
                message: 'Enter new age : ',
            },
        ])
        .then(({ name, age }) => {
            const index = read.findIndex((item) => item.name === name);
            if (index !== -1) {
                read[index].age = parseInt(age);
                fs.writeFileSync(file, JSON.stringify(read, null, 2));
                console.log('Data updated successfully');
            } else {
                console.log('Data not found');
            }
        });
}
//delete
function removeData() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter name which data u wnat to delete :',
            },
        ])
        .then(({ name }) => {
            const index = read.findIndex((item) => item.name === name);
            if (index !== -1) {
                read.splice(index, 1);
                fs.writeFileSync(file, JSON.stringify(read, null, 2));
                console.log('Data removed successfully');
            } else {
                console.log('Data not found');
            }
        });
}
