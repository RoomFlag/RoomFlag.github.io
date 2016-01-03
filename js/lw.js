
var options = {
    useEasing : false,
    useGrouping : true,
    separator : ',',
    decimal : '.',
    prefix : '',
    suffix : ''
};

startCountUp = function(){

    counter1.start();
    counter2.start();

};


$(function(){

    var numCounts = 127101;
    var numStart = 0; //numCounts * .9;

    var counter1 = new CountUp("roomCounter1", numStart, numCounts, 0, 1.5, options);
    var counter2 = new CountUp("roomCounter2", numStart, numCounts, 0, 1.5, options);


    whenHandlerIsVisible($('#roomCounter1'), function(){
        counter1.start();
        counter2.start();
    });

    whenHandlerIsVisible($('#roomCounter2'), function(){
        counter1.start();
        counter2.start();
    });

});

