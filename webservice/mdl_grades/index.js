var mongoose=require('mongoose');
var studentModel=require('./student');//the schema
var gradesData;
var gradesDataLength;

//bring the data from the db.
mongoose.connection.once('open', function (){
                studentModel.find({}, function(err, students) {
                if(err){ //if error occured
                  throw err;  
                } 
                else{
                    //console.log(students); //for testing
                    gradesData=students;
                    gradesDataLength=gradesData.length;
                    mongoose.disconnect();
                }
             });
    });

//returns the the data from mongo DB.
exports.getAllStudents=function(){ 
   return gradesData;
};

//returns the Json with the student details by his id number. 
exports.getStudGradeById=function(id){
    var returnMsg;
    if(isNaN(parseInt(id))){ //if the given argument is illegal- characters. 
        returnMsg={"Error":"not a number"}
    }
    else if(id<0){
         returnMsg={"Error":"negative number"}
     }
    else{
        console.log("getStudGradeById function. searching id:"+id);
        for(var i = 0 ; i < gradesDataLength;i++){
            console.log("test"+gradesData[i].studentId);
            if(gradesData[i].studentId == id){ //searching the student by id.
                returnMsg = gradesData[i];
                break;
            }
        }
        if(returnMsg==undefined){  //didnt find.
                returnMsg={"Error":"didnt find any result"}
        }
    }
    return returnMsg;
};

//returns list of students (json) from a particular year. 
//he argument "year" must be between 1 to 4. 
//1- is first year students, 2 is second year students, et cetera... 
exports.getStudentsByYear=function(year){
    var returnMsg;
    if(isNaN(parseInt(year))){
        returnMsg={"Error":"not a number"}

    }
    else if(year>4||year<1){
         returnMsg={"Error":"year must be between 1 to 4"}
     }
    else{
        console.log("getStudentsByYear function. searching year:"+year);
        returnMsg=[];
        for(var i = 0 ; i < gradesDataLength;i++){
            if(gradesData[i].year == year){
                returnMsg.push(gradesData[i]); //adding the student to students array.
            }
        }
        if(returnMsg==undefined){
            returnMsg={"Error":"didnt find any result"}
        }
     
    }
    //console.log("test3:"+returnMsg);
    return returnMsg;
};




