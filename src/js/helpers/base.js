
function numberFormat(num){
    if(num!=="")
        return  new Intl.NumberFormat().format(num);
    else
        return "-";
}

/**
 * return average of values of a given arr of arr
 * @param DataObject
 */
function getAverage(dataArr){
    var resultArr = [];
    var values = dataArr.map(function(a){return a[1]});

    if(values[0]==="")
        values.shift();


    var avg =  (values.reduce(function(p,c){return parseInt(p)+parseInt(c)},0)/Object.values(values).length).toFixed(2);

     dataArr.forEach(function(d){resultArr.push([d[0], avg])});
    return resultArr;
}