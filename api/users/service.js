const { db } = require('../../database.js')

module.exports = {
    create: (data, callBack) => {
        db.query(`
insert into users(email,name,password)
values(?,?,?)`, [
            data.email,
            data.name,
            data.password
        ], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results)
        })

    },

    getUsers: callback => {
        db.query(
            `select * from users`,
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results);
            }
        )
    },

    getUserbyId: (id, callback) => {
        db.query(
            `SELECT email,name FROM users where
            id = ?`, [id], (err, results, fields) => {
            if (err) {
                return callback(err)
            }
            return callback(null, results[0])
        }
        )
    },

    updateUser: (data, callBack) => {
        db.query(`UPDATE users SET email =?,
        name=?, password = ? where id = ?`, [
            data.email,
            data.name,
            data.password,
            data.id
        ], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results)
        })

    },
    deleteUser: (data, callBack) => {
        db.query(`DELETE FROM users WHERE id =?`, [data.id]
            , (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0])
            })

    },
    getUserbyEmail: (email, callback) => {
        db.query(
            `SELECT * FROM users WHERE email = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    }
};