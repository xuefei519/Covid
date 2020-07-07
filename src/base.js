const numberFormat = function(num){
    if(num!=="")
        return  new Intl.NumberFormat().format(num);
    else
        return "-";
};

export default {
    numberFormat: numberFormat
}