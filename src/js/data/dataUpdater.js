import $ from 'jquery';
import moment from 'moment';

var dateMax;

 
  //***************** Read data *************/


 var regionData = {},
     cumulativeData = {},
     regionHistory = {};

 var getRegionTotalData = new Promise(function(resolve, reject){
  $.getJSON("./data/currentTotalCases.json", function(rawData) {

      var dates = rawData.map(function(d){return new Date(d.date);})

      dateMax = new Date(Math.max.apply(null,dates));
      var currentDate = dateMax.toISOString().slice(5, 7) + '/'
              + dateMax.toISOString().slice(8, 10) + '/'
              + dateMax.toISOString().slice(2, 4);

      $('#updatedDate').text(moment(dateMax).format('D MMMM YYYY,'));

      var latestDayData = rawData.filter(function(d){return d.date === currentDate;})[0];

      for(var region in latestDayData.case.regions){
          $('#mchi_region_'+region +' .regionLabel').text(regionList[region].name);
          $('#mchi_region_'+region +' .regionTotal').text(numberFormat(latestDayData.case.regions[region]));
          $('#mchi_region_'+region +' .regionDeath').text(numberFormat(latestDayData.death.regions[region]));
      }


      $('.regionLabel').on('mouseover mouseout', function (event) {
          var mapObj = $('#rss_map').vectorMap('get', 'mapObject');
           event.preventDefault();
          var evtype = event.type,
              code = $(this).parent().attr('id').split('_')[2];

          if (evtype === 'mouseover') {
              mapObj.regions[code].element.setHovered(true);
          } else {
              mapObj.regions[code].element.setHovered(false);
          };
      });

      $('.regions_list .regionTotal#mchi_region_case_total').text(numberFormat(latestDayData.case.total));
      $('.regions_list .regionTotal#mchi_region_death_total').text(numberFormat(latestDayData.death.total));


      regionData = latestDayData.case.regions;

      var processedData = {case:[],death:[]};

      rawData.forEach(function(day){
          var sub_case={}, sub_death={};
          sub_case['period'] = new Date(day.date).toISOString().slice(0,10).replace(/-/g,'/');
          sub_death['period'] = new Date(day.date).toISOString().slice(0,10).replace(/-/g,'/');
          for(region in day.case.regions){
                    var regionName = regionList[region].name;
                    sub_case[regionName]=day.case.regions[region];
                    if(day.death.regions[region]!=="")
                        sub_death[regionName]=day.death.regions[region];
          };
          processedData.case.push(sub_case);
          processedData.death.push(sub_death);
          if(Object.keys(processedData.case).length == Object.keys(rawData).length){
                regionHistory = processedData;
            }
      });

      resolve();
  });
 });

 var getDailyHospitalAndDeath = new Promise(function(resolve, reject){

   /*
    create this data structure for display array of object like
    { "period": "2020-04-01", "Admission": 807, "Décès": 660 },
   */

  $.getJSON("./data/dailyHospital.json", function (data) {
         var processedDailyHospitalAndDeath = []   ;
         data.forEach(function(d, idx){
             processedDailyHospitalAndDeath.push({"period":d.date, "Admission":d.tot_hosp_no_trans, "Décès":"0" })

             if(idx === data.length-1){

                  /******** Call for second file*******/

                   $.getJSON("./data/dailyDeath.json", function (data_2) {
                             data_2.forEach(function(d, jdx){
                                let _arrIdx = processedDailyHospitalAndDeath.findIndex(obj =>  obj.period === d.Discharge_date  )

                                 // add death property
                                processedDailyHospitalAndDeath[_arrIdx]['Décès'] = d.N  ;
                                if(jdx === data_2.length-1){
                                    resolve( processedDailyHospitalAndDeath);
                                 }
                             });
                      });

                 /******* End second file *******/
             }
         });
    });
 });


  var getDailyHospitalAge = new Promise(function(resolve, reject){

   /*
    create this data structure for display array of object like
        [{value:6588,name:"0-69"},{value:7005,name:"70+"} ]

     for component #echart_donut_age70
   */

  $.getJSON("./data/dailyHospitalAge.json", function (data) {
         var under70 = 0 , over70 = 0   ;
         data.forEach(function(d, idx){

             if( ! isNaN( d.admissions_81_et_older)){ over70 += parseInt( d.admissions_81_et_older) ; }
             if( ! isNaN( d.admission_under_80)){ under70 += parseInt(d.admission_under_80) ; }
             
             if(idx === data.length-1){
                 resolve( [{value:under70,name:"0-80"}, {value:over70,name:"81+"}]);
             }
         });
    });
 });

 var getCumulativeData = new Promise(function(resolve, reject) {
  $.getJSON("./data/cumulativeCases.json", function (rawData) {
         var processedData = {
             new_cases:{data:{}},
             active:{data:{}},
             confirmed:{data:{}},
             new_death:{data:{}},
             death:{data:{}},
             hospitalized:{data:{}},
             ICU:{data:{}},
             tested:{data:{}},
             new_tested:{data:{}},
             recovered:{data:{}}
         };

         rawData.forEach(function(dailyData){
             var date = dailyData.date;
           Object.keys(dailyData).forEach(function (category) {
               if(category!=='date'){
                   if(date!=='diff')
                       processedData[category].data[date]= dailyData[category];
                   else
                       processedData[category][date] = dailyData[category];
               }
           });
         });

         cumulativeData = processedData;

         if(Object.keys(processedData["new_cases"].data).length == rawData.length - 1){
             resolve();
         }
  });
 });

 var getData = new Promise(function(resolve, reject){
  getCumulativeData
      .then(getRegionTotalData)
        .then(function(){
       var data = {
           regionData:regionData,
           cumulativeData:cumulativeData,
           regionHistory: regionHistory};
       resolve(data);
      })
 });

 function prepareRegionData(region){
     return new Promise(function(resolve, reject){
         var processedData = {},
         processedNew = {};
         regionHistory.case.forEach(function(date){
             var previousDay = moment(new Date(date.period)).subtract(1, 'days').format('YYYY/MM/DD'),
                 previousData = regionHistory.case.filter(function(d){return d.period == previousDay})[0];

             processedData[date.period] = {
                 data :date[region],
                 diff : previousData?date[region] - previousData[region]: undefined
             };
         });

         regionHistory.death.forEach(function(date){
             var previousDay = moment(new Date(date.period)).subtract(1, 'days').format('YYYY/MM/DD'),
                 previousData = regionHistory.death.filter(function(d){return d.period == previousDay})[0];

             if(date[region]){
                processedData[date.period]["death"]=date[region];
                processedData[date.period]["deathDiff"] = previousData?date[region] - previousData[region]: undefined ;
             }
         });

         if(Object.keys(processedData).length === Object.keys(regionHistory.case).length)
             resolve(processedData);
     });
 }

 