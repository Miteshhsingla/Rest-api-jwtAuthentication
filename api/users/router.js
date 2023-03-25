const { createUser,getUserbyId,getUsers,updateUsers,deleteUsers,login } = require('./controller.js')
const router = require("express").Router();

router.post('/', createUser);
router.get('/',getUsers);
router.get('/:id',getUserbyId);
router.patch('/',updateUsers);
router.delete('/',deleteUsers);
router.post('/login',login)
module.exports = router;
