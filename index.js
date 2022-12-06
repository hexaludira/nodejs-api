const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const mysql = require('mysql');

//parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
	host: 'localhost',
	user : 'hexaludi_api',
	password : 'hexaludi_api',
	database : 'hexaludi_api'
});

//connect ke database
conn.connect((err)=>{
	if(err) throw err;
	console.log('Mysql Connected...');
});

//tampilkan semua data product
app.get('/api/incidents',(req, res) => {
	let sql = "SELECT * FROM tbl_incident_list";
	let query = conn.query(sql, (err, results) =>{
		if(err) throw err;
		res.send(JSON.stringify({"status":200, "error" : null, "response" : results}));
	});
});

//Tampilkan incident berdasarkan ID
app.get('/api/incidents/:id',(req, res)=>{
	let sql = "SELECT * FROM tbl_incident_list WHERE incident_id="+req.params.id;
	let query = conn.query(sql, (err, results) => {
		if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response" : results}));
	});
});

//tambahkan data incident baru
app.post('/api/incidents',(req, res) => {
	let data = {incident_name : req.body.incident_name, incident_date : req.body.incident_date, incident_time_begin : req.body.incident_time_begin, incident_time_end : req.body.incident_time_end, incident_location : req.body.incident_location, incident_detail : req.body.incident_detail, incident_location : req.body.incident_location, incident_affected : req.body.incident_affected, incident_picture_name : req.body.incident_picture_name, incident_remark : req.body.incident_remark, incident_status : req.body.incident_status};
	let sql = "INSERT INTO tbl_incident_list SET ?";
	let query = conn.query(sql, data, (err, results) => {
		if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response" : results}));
	});
});

//Edit data incident berdasarkan ID
app.put('/api/incidents/:id', (req, res) =>{
	let sql = "UPDATE tbl_incident_list SET incident_name='" + req.body.incident_name + "', incident_date='" + req.body.incident_date + "', incident_time_begin='" + req.body.incident_time_begin + "', incident_time_end='" + req.body.incident_time_end + "', incident_location='" + req.body.incident_location + "', incident_detail='" + req.body.incident_detail + "', incident_location='" + req.body.incident_location + "', incident_affected='" + req.body.incident_affected + "', incident_picture_name='" + req.body.incident_picture_name + "', incident_remark='" + req.body.incident_remark + "', incident_status='" + req.body.incident_status + "' WHERE incident_id=" + req.params.id;
	let query = conn.query(sql, (err, results) => {
		if(err) throw err;
		res.send(JSON.stringify({"status" : 200, "error" : null, "response" : results}));
	});
});

//Delete data incident berdasarkan ID
app.delete('/api/incidents/:id', (req,res) => {
	let sql = "DELETE FROM tbl_incident_list WHERE incident_id=" + req.params.id + "";
	let query = conn.query(sql, (err,results) => {
		if(err) throw err;
			res.send(JSON.stringify({"status" : 200, "error" : null, "response" : results}));
	});
});

//server listening
app.listen(3000,()=>{
	console.log('Server started on port 3000...');
});