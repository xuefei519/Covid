<template>
    <div class="row">
        <div class="col-md-9 col-sm-9 col-xs-12">
            <div id="flot" ></div>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
            <div class="x_title">Les Données</div>
            <ul id="ToggleController">
                <li v-for="(category, x) in value" v-if="isCategoryToShow(x)" v-bind:key="x">
                    <label class="checkbox-button">
                        <input v-bind:value="x"  v-bind:id="x" type="checkbox" checked="checked" v-model="checkedCategories" class="checkbox-button__input"/>
                        <span class="checkbox-button__control"></span>
                        <span class="checkbox-button__label">{{getLabel(x)}}</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import cst from "@/const.js";
    import base from "@/base.js";
    import { bus } from '@/main.js';

    window.jQuery = require('jquery');
    var $ = window.jQuery;

    var daysMap = [],
        dataset = {};

    var dateRange;

    var settings = {
        series: {
            shadowSize: 2
        },
        grid: {
            verticalLines: true,
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#fff',
        },
        xaxis: {
            tickColor: "rgba(51, 51, 51, 0.06)",
            mode: "time",
            tickSize: [1, "day"],
            ticks: daysMap,
            timezone: "browser",
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 10,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        yaxis: {
            position: "left",
            ticks: 8,
            tickColor: "rgba(51, 51, 51, 0.06)",
        },
        legend: {
            show:false,
        },
        tooltip: true
    };

    export default {
        name: "Flot",
        props:{
          value:{
              type: Object
          }
        },
        data(){
            return{
                numberFormat: base.numberFormat,
                checkedCategories: [ "new_cases", "active", "confirmed", "new_death", "death", "hospitalized", "tested", "new_tested"]
            }
        },
        mounted(){
            this.processData(this.value);
            this.toggleSerie();
        },
        created(){
            bus.$on('updateRange', (range)=>{
                dateRange = range;
                this.processData(this.value);
                this.toggleSerie();
            })
        },
        methods:{
            processData(data){

                var confirmedData = data.confirmed.data,
                    deathData = data.death.data,
                    newDeathData = data.new_death.data,
                    hospitalizedData = data.hospitalized.data,
                    newData = data.new_cases.data,
                    activeData = data.active.data,
                    testedData = data.tested.data,
                    newTestedData = data.new_tested.data,

                    confirmed_arr = [],
                    death_arr = [],
                    newDeath_arr = [],
                    hospitalized_arr = [],
                    new_arr = [],
                    active_arr = [],
                    tested_arr = [],
                    newTested_arr = [];

                for (var day in confirmedData) {
                    if (!dateRange || (new Date(day) >= dateRange.startDate.setHours(0, 0, 0, 0) && new Date(day) <= dateRange.endDate.setHours(0, 0, 0, 0))) {
                    confirmed_arr.push([new Date(day), confirmedData[day]]);
                    death_arr.push([new Date(day), deathData[day]]);
                    newDeath_arr.push([new Date(day), newDeathData[day]]);
                    hospitalized_arr.push([new Date(day), hospitalizedData[day]]);
                    new_arr.push([new Date(day), newData[day]]);
                    active_arr.push([new Date(day), activeData[day]]);
                    tested_arr.push([new Date(day), testedData[day]]);
                    if(newTestedData[day]!=="")
                        newTested_arr.push([new Date(day), newTestedData[day]]);
                    }
                    daysMap.push([new Date(day), moment(new Date(day)).format('MMM D')]);
                }

                var newDeath_avg = this.getAverage(newDeath_arr),
                    new_avg = this.getAverage(new_arr),
                    newTested_avg = this.getAverage(newTested_arr);

                dataset = {
                    "confirmed": {data: confirmed_arr, color:"#f7a35c"},
                    "hospitalized": {data: hospitalized_arr, color:"#f45b5b"},
                    "death": {data: death_arr, color: "#434348"},
                    "new_cases": {data: new_arr, color: "#1C819a"},
                    "new_death" : {data: newDeath_arr, color:"#842593"},
                    "active": {data: active_arr, color:"#c73558"},
                    "new_cases avg":{data: new_avg},
                    "new_death avg" : {data: newDeath_avg},
                    "tested" : {data: tested_arr, color:"#9BBB59"},
                    "new_tested" : {data: newTested_arr, color:"#588B76"},
                    "new_tested avg" : {data: newTested_avg}
                };

                return dataset;
            },
            isCategoryToShow(category){
                return cst.categoryFlotToShow.indexOf(category) > -1;
            },
            getLabel(category){
                return cst.labels[category];
            },
            toggleSerie(){
                var d = [];
                this.checkedCategories.forEach((category)=>{

                        d.push({
                            label:cst.labels[category],
                            data: dataset[category].data,
                            color: dataset[category].color,
                            lines: {
                                show: true,
                                fill: 0.4
                            },
                            points: {
                                radius: 2,
                                show: true
                            }});
                        if(dataset[category+" avg"])
                            d.push({
                                label:cst.labels[category]+" moyenne",
                                data: dataset[category+" avg"].data,
                                color: dataset[category].color,
                                dashes: {
                                    show: true,
                                    dashLength: 5
                                },
                                points: {
                                    radius: 1,
                                    show: true
                                }});

                });

                $("#flot").bind("plothover", function (event, pos, item) {
                    if (item) {
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1];

                        $('#plot_tooltip').html(item.series.label + ": " + base.numberFormat(y))
                            .css({top: item.pageY + 5, left: item.pageX + 5})
                            .fadeIn(200)
                    } else {
                        $('#plot_tooltip').hide();
                    }
                });


                $.plot($("#flot"), d, settings);
            },
            getAverage(dataArr){
                var resultArr = [];
                var values = dataArr.map(function(a){return a[1]});

                if(values[0]==="")
                    values.shift();


                var avg =  (values.reduce(function(p,c){return parseInt(p)+parseInt(c)},0)/Object.values(values).length).toFixed(2);

                dataArr.forEach(function(d){resultArr.push([d[0], avg])});
                return resultArr;
            }
        },
        watch:{
            value:function(){
                this.processData(this.value);
            },
            checkedCategories: function(){
                this.toggleSerie()
            }
        }
    }
</script>

<style scoped>
#flot{
    height: 400px;
}
</style>