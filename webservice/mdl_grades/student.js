 var mongoose=require('mongoose');
 var schema=mongoose.Schema;
 var studentSchema=new schema({ //schema definition
    name: String,
     studentId:{type:Number,unique:true}, 
     year:Number,
     courses:[{courseName:String,grade:Number}]
 }, {collection:'students'});

//creating a model object and connecting the schema to it.
 var studentModel=mongoose.model('studentModel',studentSchema);
 module.exports=studentModel; //exports the model