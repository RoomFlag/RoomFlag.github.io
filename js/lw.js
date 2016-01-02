
var options = {
    useEasing : true,
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

    var counter1 = new CountUp("roomCounter1", 0, 127101, 0, 3, options);
    var counter2 = new CountUp("roomCounter2", 0, 127101, 0, 3, options);


    whenHandlerIsVisible($('#roomCounter1'), function(){
        counter1.start();
        counter2.start();
    });

    whenHandlerIsVisible($('#roomCounter2'), function(){
        counter1.start();
        counter2.start();
    });

});

