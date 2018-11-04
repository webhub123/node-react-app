
const list_controller = require('./query_controller/list_controller');
const user_controller = require('./query_controller/user_controller');


const express = require('express');
const router = express.Router();

//query info list
router.post('/list/', list_controller.get_list); 
router.get('/list/:id', list_controller.get_list_id); 

router.delete('/list/delete/:id', list_controller.delete_list);
router.put('/list/update/:id', list_controller.update_list);
router.post('/list/save', list_controller.save_list);
router.get('/get_ac_list/:term', list_controller.get_ac_list);


//user log in & registration
router.post('/register/save', user_controller.save_register);
router.post('/log_checker', user_controller.log_checker);


router.post('/session_checker', user_controller.session_checker);
router.post('/logout', user_controller.logout);


//upload file
router.post('/upload_file', list_controller.upload_file);

//sent email
router.post('/sent_email', list_controller.sent_email);


router.all('*', (req, res) => {
    res.status(404).send('Error 404');
});


module.exports = router;