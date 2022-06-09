const http = require("http");
const fs = require("fs");
const crypto = require("crypto");

const port = 4000;


  const loadTodo = () => {
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) 
      throw err;
      const json = data;
      const parsed = JSON.parse(json);
      todos = parsed;
    });
  }
  const writeFile = (todos) => {
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) 
      
      throw err;
    });
  }
  
  

  const app = http.createServer((req, res) => {

    const items = req.url.split("/");
  
    res.setHeader("Access-Control-Allow-Origin", "*");   
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Request-Method, Access-Control-Request-Headers,Access-Control-Allow-Headers, Origin,Content-Type",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, PATCH, DELETE, OPTIONS, POST, PUT"
    );
    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      res.end();
      return; 
    }   
 


if (req.method === "GET") 
{ if (items[1] === "todos" ) { 
  if (items[2]) {
    const reqId = parseInt(items[2]);
    const reqTodo = todos.find((todo) => { 
    return todo.id ===reqId;

  });
  if (!reqTodo){
    res.statusCode= 404;
    res.end(`${statusCode}`)
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(reqTodo));
  }}
 else {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(todos));
}
}else {
  res.statusCode= 404
res.end(`${res.statusCode}`); }
}

 

if (req.method === "POST"){
if(items.length === 2 &&  items[1] === "todos") {
  res.setHeader("Content-Type", "application/json")

  res.statusCode = 200;
  console.log(`${res.statusCode}todo added`)
  req.on("data", (chunk) => {
    const data = JSON.parse(chunk);
    
    todos.push({
      id: crypto.randomInt(1, 99999),
      ...data,

      complete: false
    });

    writeFile(todos)
    res.end();
  });}
}
 
  if (req.method === "DELETE"){if( items[1] === "todos" && items.length === 3) {
    res.setHeader("Content-Type", "application/json")
    const reqId = parseInt(items[2]);
     todos = todos.filter(todos => todos.id !== reqId);
     
   
     res.statusCode = 204;
      console.log(`${res.statusCode} todo deleted`)
     writeFile(todos);
     res.end();
   }}
   if (req.method === "PUT"){
  if(items[1] === "todos" && items.length === 3) {
  
    const reqId = parseInt(items[2]);
    const todoIndex = todos.findIndex((todos) => todos.id === reqId);

    req.on("data", (chunk) => {
      todos[todoIndex] = JSON.parse(chunk);});
    req.on("end", () => {
    res.statusCode = 201;
    res.end();
    writeFile(todos);
    });
  }
}
  

  if (req.method === "PATCH"){
    if ( items[1] === "todos" && items.length === 3) {

  const reqId = parseInt(items[2]);
  const todoinfoIndex = todos.findIndex((todos) => todos.id === reqId)


  req.on("data", (chunk) => {
  const data = JSON.parse(chunk);
  let todoIndex = todos[todoIndex];

  if (data.todoinfo) {

    todoinfoIndex.todoinfo = data.todoinfo;
  } else if (data.complete) {

    todoinfoIndex.complete = data.complete; } 
    else if (!data.complete) {

      todoinfoIndex.complete = data.complete;
    
  } 
   else {

    res.statusCode = 400;
   
  } 
});
}
  }
res.statusCode = 200;
res.end();

});



app.listen(4000, () => {

console.log(`Servern går på port ${port}`);
})
loadTodo();