 
var __globalAgeCount = {
    total_0_29:6720,
    total_30_49:10505,
    total_50_69:9073,
    total_70_79:3111,
    total_80_89:4793,
    total_90:3409
};

// localStorage is use to keep data trough out the gulp minimize process - these data will be read in final min.custom.js
// number of day in for the chart  @Cas actuellement hospitalisés au Québec@   (panel mainb)

try{
    localStorage.setItem('hospital_days', JSON.stringify([1,2,3,25,4,5,5,6,6,6,7,7,31,7,20,14,19,8,9,10,11,12,13,13,22,12,24,4,15,5,6,3]));
}catch (e) {
    console.error("localStorage hospital_days error");
}

try{
    localStorage.setItem('men_women', JSON.stringify([{value:40,name:"Hommes"},{value:60,name:"Femmes"}]));
}catch (e) {
    console.error("localStorage men/women case ");
}
 
 // data to update the region table

var __regionData = {
"01":{name:"Bas-Saint-Laurent",death:1},
"02":{name:"Saguenay - Lac-Saint-Jean",death:26},
"03":{name:"Capitale-Nationale",death:74},
"04":{name:"Mauricie et Centre-du-Québec",death:121},
"05":{name:"Estrie",death:25},
"06":{name:"Montréal",death:1863},
"07":{name:"Outaouais",death:8},
"08":{name:"Abitibi-Témiscamingue",death:3},
"09":{name:"Côte-Nord",death:0},
"10":{name:"Nord-du-Québec",death:0},
"11":{name:"Gaspésie - Îles-de-la-Madeleine",death:8},
"12":{name:"Chaudière-Appalaches",death:8},
"13":{name:"Laval",death:369},
"14":{name:"Lanaudière",death:115},
"15":{name:"Laurentides",death:70},
"16":{name:"Montérégie",death:237},
"17":{name:"Nunavik",death:0},
"18":{name:"Terres-Cries-de-la-Baie-James",death:0}
};

//************************* Global count ***************************/

var __hospital_average_day_number = {
    total_3:1,
    total_4_7:45,
    total_8_14:154,
    total_15_21:14,
    total_21_plus:10
};

 
//********************* for the in hospital table beside the graph    #stackedBar

try{

     var __total_day_avg =  Object.values(__hospital_average_day_number).reduce((a, b) => a + b, 0)  ;
     var __hospital_average_day = [
                    __hospital_average_day_number.total_3 * 100 / __total_day_avg
                    ,  __hospital_average_day_number.total_4_7 * 100 / __total_day_avg
                    ,  __hospital_average_day_number.total_8_14 * 100 / __total_day_avg
                    ,  __hospital_average_day_number.total_15_21 * 100 / __total_day_avg
                    ,  __hospital_average_day_number.total_21_plus * 100 / __total_day_avg
                                    ];
    localStorage.setItem('hospital_average_table', JSON.stringify(__hospital_average_day));
}catch (e) {
    console.error("localStorage hospital average time per type error");
}
 
 