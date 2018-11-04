
const Joi = require('joi');
const connection = require('../../../db_connection');

const nodemailer = require('nodemailer');

function check_list(id,callback) {

    const query_string = ' SELECT * FROM tbl_info WHERE id = "'+id+'" ';
    connection.query(query_string, callback);

    // const checker = list_names.find(x => x.id === parseInt(id) );
    // return checker;
}


//sent email

exports.sent_email = (req, res) => {

    const { to, message } = req.body;
    

    const transporter = nodemailer.createTransport({
        service: 'mailtrap',
        auth: {
            user: '7c43dfcddf902d',
            pass: 'e7926edb340a0a'
        }
    });
        
    const mailOptions = {
        from: 'webpractice@react.com',
        to: to,
        subject: 'Sending Email using Node.js',
        html: '<h1> '+message+' </h1>'
    };
        
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
      
            res.status(500).send({'status' : false, 'error_message' : error});
        } else {
            res.status(200).send({ 'status' : true });

        }
    });
}

//uploadfile

exports.upload_file = (req, res) => {

    let file = req.files.file;
    const file_name = req.files.file.name;

    file.mv(`${__dirname}/../../../public/uploads/${file_name}`,
        function (err) {
            if (err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send('success');
        }
    
    )
}


//autocomplete list
exports.get_ac_list = (req, res) => {

    const { term } = req.params;

    const query_string = 'SELECT fullname AS name FROM tbl_info WHERE fullname LIKE "%'+term+'%" ';

    connection.query(query_string, null,  (err, rows)  => {
        if(!err) {
            res.status(200).send(rows)
        }else {
			res.status(500).send(err.sqlMessage);
        }
    });
}



//retrieve list
exports.get_list = (req, res) => {

    const { limit, offset, search } = req.body;
    let query_string = '';

    if(search.length > 0) {

        query_string = 'SELECT *,'+
    
        '(SELECT COUNT(*) FROM tbl_info WHERE fullname LIKE "%'+search+'%" ) as total_rows '+
        'FROM tbl_info '+
        'WHERE fullname LIKE "%'+search+'%" '+
        'LIMIT '+limit+' OFFSET '+offset+' ';

    }else {

        query_string = 'SELECT *,'+
    
        '(SELECT COUNT(*) FROM tbl_info ) as total_rows '+
        'FROM tbl_info '+
        'LIMIT '+limit+' OFFSET '+offset+' ';
    }
    
    connection.query(query_string, null,  (err, rows)  => {
        if(!err) {
            res.status(200).send(rows)
        }else {
			res.status(500).send(err.sqlMessage);
        }
    });
}

//get list by id
exports.get_list_id = (req, res) => {
    //res.send(req.query);

    check_list(req.params.id, (err, rows) => {
        if(rows) {
            res.status(200).send(rows);
        }else {
           res.status(404).send('Not found');
        }
    });


}; 
 
//delete list by id
exports.delete_list = (req, res) => {

    const id = req.params.id;
    const query_string = ' DELETE FROM tbl_info WHERE id = "'+id+'" ';

    connection.query(query_string, (err, rows) => {
        if(!err) {
            res.status(200).send(rows);
        }else {
            res.status(500).send(err);
        }
    });

};
//update list
exports.update_list = (req, res) => {

    const { name, address, age, gender } = req.body;
    const id = req.params.id;

    const query_string = ' UPDATE tbl_info SET fullname = "'+name+'", address = "'+address+'", age = "'+age+'", gender = "'+gender+'" WHERE id = "'+id+'" ';

    connection.query(query_string,  (err, rows) => {

        if(!err) {
            res.status(200).send({status :'success'});
        }else {
            res.status(500).send({status :'error'});
        }

    });

};

//save new list
exports.save_list = (req, res) => {

    const schema = {
        name : Joi.string().min(3).required(),
        gender : Joi.string().required(),
        address : Joi.string().min(8).required(),
        age : Joi.number().required(),
    };              
    const validate = Joi.validate(req.body, schema);

    if(validate.error) {
        res.send( {'status' : 'error', 'message' : validate.error.details[0].message} );
        return;
    }

    const { name,age,address,gender } = req.body;
    const query_string = ' INSERT INTO tbl_info(fullname,age,address,gender)VALUES("'+name+'","'+age+'","'+address+'","'+gender+'") ';

    connection.query(query_string, (err, rows) => {
        if(!err) {
            res.status(200).send( { 'status' : 'success' } );
        }else {
            res.status(500).send( {'status' : 'error', 'message' : err});
        }
    });

};
