# NodeJS-Firebase-basic

Please use "node" command to start app.js service. The service has already linked with provided Firebase. Behalf of provide TODO list result, I list the call method below. * can fill any string words. 
-----------------------
 
#### API 1) Add a TODO Item with the following data<br>
http://localhost:3000/AddTodo?UserID=*&TODOName=*&TODODeadline=*
 
#### API 2) Read a TODO Item<br>
http://localhost:3000/ReadTodo?TODOID=*
 
#### API 3) Change the Deadline of a TODO item<br>
http://localhost:3000/ChangeDeadline?TODOID*&TODODeadline=*
 
#### API 4) Delete a TODO item<br>
http://localhost:3000/DeleteTodo?TODOID=*
 
#### API 5) List all TODO items<br>
http://localhost:3000/ListAllTodo?UserID=*
