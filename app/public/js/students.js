var gradesApp=angular.module('gradesApp',[]);


var model1={
    collegeName:"Shenkar"
};

//by defaulte, show all the students grades list.
gradesApp.run(function($http){
    //the webServer link to bring all the students grades list.
    $http.get("https://students-grades-angular.herokuapp.com/getAllStudents").success(function(data){
            model1.studentList=data;
        });
});



gradesApp.controller('GradesController',function($scope,$http){
        $scope.students=model1;
        //function to show the current amounth of student search result.
        $scope.incompleteCount=function(){
            var count=0;
            angular.forEach($scope.students.studentList, function(item){
               count++;
            });
            
            if($scope.students.studentList[0].hasOwnProperty('Error')){
                count=0;
            }
            return count;
        };
        //changing the color of the amounth if studnets  number<3
        $scope.warningLevel=function(){
            return $scope.incompleteCount()<3 ? "label-success":"label-warning";
        };
        $scope.getStudentById=function(IdText){
            console.log("CLIENT-getStudentByID- arg to server is:"+IdText);
            //sending http request to server to bring specific student grades
            $http.get("https://students-grades-angular.herokuapp.com/getStudGradeById/"+IdText).success(function(data){
                console.log("CLIENT-getStudentById RESULT FROM SERVER:");
                console.log(data);
                $scope.students.studentList=[];
                $scope.students.studentList[0]=data;
            });
        };
         $scope.getStudentsByYear=function(YearText){
            console.log("CLIENT-getStudentsByYear- arg to server is:"+YearText);
            //sending http request to server in order to get a list of students from a particular year.
            $http.get("https://students-grades-angular.herokuapp.com/getStudentsByYear/"+YearText).success(function(data){
                console.log("CLIENT-getStudentsByYear RESULT FROM SERVER:");
                $scope.students.studentList=[];
                //checking valid response
                if(data.hasOwnProperty('Error')){
                    console.log("there is an error:");
                    console.log(data);
                    //show the error type to the user
                    $scope.students.studentList[0]=data;
                }
                else{ //the response is OK
                    $scope.students.studentList=data;
                }
            });
        };
});


