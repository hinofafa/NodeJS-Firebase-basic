const express = require('express');
const app = express();
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDzyt-Ta5yfkk_ya-jt2JHxVi_V3DaTaQE",
    authDomain: "hellonode-1176c.firebaseapp.com",
    databaseURL: "https://hellonode-1176c.firebaseio.com",
    projectId: "hellonode-1176c",
    storageBucket: "hellonode-1176c.appspot.com",
    messagingSenderId: "1038193397340"
  };

firebase.initializeApp(config);
var db = firebase.database();
var noTodo = 0;
var ref = db.ref("/");

app.listen(3000, function () {
	ref.on("value", function (snapshot) {
  		noTodo = snapshot.numChildren();
  		console.log('Example app is running on port 3000!\nThe firebase length is: '+noTodo);
	});
});

app.get('/AddTodo', function(req, res) {
	console.log("AddTodo API is called.\nThe User query is: ");
	console.log(req.query);
	if( "UserID" in req.query && "TODOName" in req.query && "TODODeadline" in req.query){
		//res.send("Success");
		req.query.TODOCreatedTime = Date(); 
		
		ref = db.ref("/").push();

		if("TODOCreatedTime" in req.query)
			console.log("TODOCreatedTime is :"+req.query.TODOCreatedTime);
		TodoID = ref.key;
		ref.set(req.query, function(error){ // 存放資料到 Reference 物件代表的路徑
			if(error){
				res.send("Todo has not added to firebase"); // 儲存資料失敗，回報失敗給前端
			}else{
				res.send("Todo has added to firebase. TODOID is: "+ TodoID); // 儲存資料成功，回報成功給前端
			}
		});
	}
	else{
		res.send("UserID, TODOName and TODODeadline, one of them are missing to call AddTodo API.");
	}
});

app.get('/ReadTodo', function(req, res) {
	console.log("ReadTodo API is called.\nThe User query is: ");
	console.log(req.query);
	if( "TODOID" in req.query ){
		//res.send("Success");
		TodoID = req.query.TODOID;
		var ref = db.ref("/"+TodoID);
	
		ref.on("value", function(snapshot){ // 取得目標路徑整份資料
			let value=snapshot.val(); // 取得資料
			console.log(value);
			if(value==null)
				res.send("TODOID "+TodoID+" does not exist in firebase.");
			else
				res.send(value);
			}, function(error){
			console.log(error); // 印出錯誤
		});

	}
	else{
		res.send("TODOID is missing to call ReadTodo API");
	}
});

app.get('/ChangeDeadline', function(req, res) {
	console.log("ChangeDeadline API is called.\nThe User query is: ");
	console.log(req.query);
	if( "TODOID" in req.query && "TODODeadline" in req.query){
		//res.send("Success");
		TodoID = req.query.TODOID;

		var ref = db.ref("/"+TodoID);
		ref.once("value", function(snapshot){ // 取得目標路徑整份資料
			let value=snapshot.val(); // 取得資料
			console.log(value);
			if(value==null)
				res.send("TODOID "+TodoID+" does not exist in firebase.");
			else{
				value.TODODeadline = req.query.TODODeadline;
				ref.update({"TODODeadline":req.query.TODODeadline}, function(error){ // 取得目標路徑整份資料
				if(error){
					res.send("Failed"); // 更新資料失敗，回報失敗給前端
				}else{
					res.send(value); // 更新資料成功，回報成功給前端
				}
				});
			}
			}, function(error){
			console.log(error); // 印出錯誤
		});
	}
	else{
		res.send("TODOID and TODODeadline, one of them is missing to call ChangeDeadline API.");
	}
});

app.get('/DeleteTodo', function(req, res) {
	console.log("DeleteTodo API is called.\nThe User query is: ");
	console.log(req.query);
	if( "TODOID" in req.query ){
		//res.send("Success");
		TodoID = req.query.TODOID;
		
		var ref = db.ref("/"+TodoID);
		
		ref.once("value", function(snapshot){ // 取得目標路徑整份資料
			let value=snapshot.val(); // 取得資料
			console.log(value);
			if(value==null)
				res.send("Error");
			else{
				ref.remove(function(error){ // 取得目標路徑整份資料
				if(error){
					res.send("Error"); // 刪除資料失敗，回報失敗給前端
				}else{
					res.send("Success"); // 刪除資料成功，回報成功給前端
				}
				});
			}
			}, function(error){
			res.send("Error");
			console.log(error); // 印出錯誤
		});
	}
	else{
		res.send("TODOID is missing to call DeleteTodo API");
	}
});

app.get('/ListAllTodo', function(req, res) {
	console.log("ListAllTodo API is called.\nThe User query is: ");
	console.log(req.query);
	if( "UserID" in req.query ){
		//res.send("Success");
		UserID = req.query.UserID;
		var ref = db.ref("/");
	
		ref.orderByChild("UserID").equalTo(UserID).on('value', function(snapshot){ // 取得目標路徑整份資料
			let value=snapshot.val(); // 取得資料
			console.log(value);
			if(value==null)
				res.send("UserID "+UserID+" does not exist in firebase.");
			else
				res.send(value);
			}, function(error){
			console.log(error); // 印出錯誤
		});

	}
	else{
		res.send("UserID is missing to call ListAllTodo API");
	}
});