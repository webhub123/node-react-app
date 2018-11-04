
const Joi = require('joi');
const connection = require('../../../db_connection');

var bcrypt = require('bcrypt');
const saltRounds = 10;


exports.logout=(req, res)=>{
	if(req.session){
        req.session.user_id = null;
        req.session.destroy(function(err){
            res.redirect('/');
        });
	}
}

exports.session_checker = (req, res) => {

    if(req.session.user_id) {
        res.status(200).send( {'session_status' : true } );
    }else {
        res.status(200).send( {'session_status' : false } );

    }
};

exports.save_register = (req, res) => {

    const schema = {
        username : Joi.string().min(3).required(),
        password : Joi.string().min(8).required(),
    };              
    const validate = Joi.validate(req.body, schema);

    if(validate.error) {
        res.send( {'status' : 'error', 'message' : validate.error.details[0].message} );
        return;
    }

    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);

    
    const query_string = ' INSERT INTO users(username,password)VALUES("'+username+'","'+hash+'") ';

    connection.query(query_string, (err, rows) => {
        if(!err) {
            res.status(200).send( { 'status' : 'success' } );
        }else {
            res.status(500).send( {'status' : 'error', 'message' : err});
        }
    });

};


exports.log_checker = (req, res) => {

    const { username, password } = req.body;
    const query_string = ' SELECT * FROM users WHERE username = "'+username+'" LIMIT 1 ';

    connection.query(query_string, (err, rows) => {
        if(!err) {

            if(rows.length == 0) {
                res.status(500).send( {'status' : 'error', 'message' : err});
            }else {

                const hash = rows[0].password;

                if(bcrypt.compareSync(password, hash)) {

                    //some sessions
                    req.session.user_id = rows[0].id;
                    res.status(200).send( { 'status' : 'success', 'id' : rows[0].id } );
                }else { 
                    res.status(500).send( {'status' : 'error', 'message' : err});
                }   
            }
        }else {
            res.status(500).send( {'status' : 'error', 'message' : err});
        }
    });

};
