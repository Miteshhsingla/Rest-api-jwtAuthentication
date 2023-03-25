const { create, getUserbyId, getUsers, updateUser, deleteUser, getUserbyEmail } = require('./service.js')
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { res } = require('express');
const { sign } = require('jsonwebtoken')


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log('err')
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });

            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserbyId: (req, res) => {
        const id = req.params.id;
        getUserbyId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log('err')
                return;

            }
            if (!results) {
                return res.json({
                    success: 1,
                    message: 'data not found'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Updated Successfully'
            });
        });
    },

    deleteUsers: (req, res) => {
        const body = req.body;

        deleteUser(body, (err, results) => {
            if (err) {
                console.log('err')
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not Found'
                })
            }

            return res.status(200).json({
                success: 1,
                data: "user deleted successfully"
            });
        });
    },

    
    login: (req, res) => {
        const body = req.body
        getUserbyEmail(body.email, (err, results) => {
            if (err) {
                console.log('error')
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password)
            if (result) {
                results.password = undefined
                const jsontoken = sign({ result: results }, "key1234", {
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "login successfull",
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }

        })



    }
}