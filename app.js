const express = require('express');
const app = express();

//connection to mongodb
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/student_classDB");
//Sending request
app.get('/', (req, res) => res.send('Its working!'));
app.listen(3000, function(){
   console.log('now listening for requests at 3000');
});

//Schema for Class--blueprint
const classSchema=new mongoose.Schema({
  std: {
    type :Number,
    required:true
},
  div: {
    type :String,
    required:true
}

});
//Schema for Student blueprint
const studentSchema=new mongoose.Schema({
  name:{
    type :String,
    required:true
},
  roll_no:{
    type :Number,
    required:true
},
  mob:{
    type :Number,
    required:true
},
  class_id:{
    type :String,
    required:true
},
  standard:classSchema,
  division:classSchema
});
//model for Student
const Student=mongoose.model("Student",studentSchema);
//model for class
const Class=mongoose.model("Class",classSchema);

app.listen(4000, function(){
   console.log('now listening for requests');
});

//creating entries to class

const Class1=new Class({
  std:1,
  div:"A"
});
const Class2=new Class({
  std:2,
  div:"B"
});
const Class3=new Class({
  std:3,
  div:"C"
});

//inserting the data to the  Class collection
Class.insertMany([Class1,Class2,Class3],function(err){
  if(err){
    console.log("Failure"+err);

  }
  else{
    console.log("Success");
  }
});

//creating entries to student
const student1=new Student({
  name: "Anu",
  roll_no: 1,
  mob: 123,
  class_id:"id1",
  standard:Class1,
  division:Class1
});
const student2=new Student({
  name: "Akku",
  roll_no: 2,
  mob: 345,
  class_id:"id2",
  standard:Class2,
  division:Class2
});
const student3=new Student({
  name: "Devu",
  roll_no: 3,
  mob: 567,
  class_id:"id3",
  standard:Class3,
  division:Class3
});
//inserting to Students
Student.insertMany([student1,student2,student3],function(err){
  if(err){
    console.log("Failure"+err);

  }
  else{
    console.log("Success");
  }
});


// reading all students in a class with std and div
Student.find(function(err,student){
  if(err)
  {console.log(err);
  }
  else{
    student.forEach(student => {
      console.log("Name: "+student.name+" STD:"+student.standard.std+" DIV:"+student.division.div);
    });
  }
});
//update the class with std and div

Class.updateOne({_id:"61efdf4f4b15dd16adf30601"},{$set:{std: "1",div:"A"}},function(err){
  if(err){
    console.log("Failure"+err);

  }
  else{
    console.log("Success");
}
});
//Deleting the student and class entries

Student.deleteMany({},function(err){
  if(err){
    console.log("Failure"+err);

  }
  else{
    console.log("Success");
  }
});
Class.deleteMany({},function(err){
  if(err){
    console.log("Failure"+err);

  }
  else{
    console.log("Success");
  }
});
