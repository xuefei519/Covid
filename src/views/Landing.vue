<template>
    <div class="mt-150 dashboard">
    <section>
        <div class="container dashContainer">
        <div class="row tile_count col-md-12 ">
            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 top_stat" v-for="(category, x) in categories" v-if="isCategoryToShow(x)" v-bind:key="x">
                <TopStat v-bind:value="getValue(category.data)" v-bind:label="getLable(x)" v-bind:number="getNumber(category)"  v-bind:diff="parseFloat(category.diff)"></TopStat>
            </div>
        </div>
        </div>
    </section>
        <section>
            <div class="container dashContainer">
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="x_panel">
                            <ProgressChart v-bind:value="getPercent(getNumber(categories.ICU), ICU_bed_cap)" title="Lits de soins intensifs occupés" subtitle="pourcentage de lits actuellement occupés" v-bind:number="getNumber(categories.ICU)"></ProgressChart>
                        </div>
                        <div class="x_panel">
                            <ProgressChart v-bind:value="getPercent(getNumber(categories.hospitalized), hospital_bed_cap)" title="Lits d'hôpitaux occupés" subtitle="pourcentage de lits actuellement occupés" v-bind:number="getNumber(categories.hospitalized)"></ProgressChart>
                        </div>
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Répartition par genre</h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link" v-on:click="togglePanel"><i class="fa fa-chevron-up"></i></a></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                                <DoughnutChart style="height:300px"></DoughnutChart>
                            </div>
                        </div>
                        </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Localisation des cas <small>par RSS</small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link" v-on:click="togglePanel"><i class="fa fa-chevron-up"></i></a></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                                <div class="row">

                                    <Map id="rss_map" :data="regionData.case.regions" class="col-md-6 col-sm-8 col-xs-12"></Map>

                                    <div class="col-md-6 col-sm-8 col-xs-12 hidden-small">
                                        <h3 class="regionTable_title"> Régions principales</h3>
                                        <regionTable class="regions_list" :data="regionData"></regionTable>
                                        <span id="total_note">Le total des cas confirmés du Québec ne correspond pas toujours à la somme des cas dans les RSS puisque la région sociosanitaire est parfois inconnue ou que certaines personnes non résidentes ont été testées au Québec.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container dashContainer">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="x_panel">
                        <div class="x_title row">
                            <div class="col-md-6">
                                <h2>Progression des cas</h2>
                            </div>
                            <div class="col-md-6" style="text-align: right">
                                <DateRangePicker :range="dateRange"></DateRangePicker>
                            </div>

                        </div>
                            <Flot :value="categories"></Flot>
                    </div></div>
                </div></div>
        </section>
        <section>
            <div class="container dashContainer">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Distribution of confirmed cases by age group</h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link" v-on:click="togglePanel"><i class="fa fa-chevron-up"></i></a></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                                <PieChart style="height: 300px" :value="gender"></PieChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="plot_tooltip" style="position: absolute; display: none; border: 1px solid #888888; padding: 2px; background-color: #ffffff; opacity: 0.8;"></div>

    </div>
</template>

<script>
    import TopStat from "./components/TopStat";
    import Map from "./components/Map";
    import RegionTable from "./components/RegionTable";
    import ProgressChart from "./components/ProgressChart";
    import Flot from "./components/Flot";
    import DateRangePicker from "./components/DatePickers";
    import cst from "@/const.js";
    import ECharts from 'vue-echarts'
    import DoughnutChart from "./components/DoughnutChart";
    import PieChart from "./components/PieChart";

    var currentDate='';

    export default {
        name: "Dashboard",
        components: {PieChart, DoughnutChart, Map, TopStat, RegionTable, ProgressChart, Flot, DateRangePicker},
        data(){
          return {
              categories:null,
              regionData:null,
              hospital_bed_cap: cst.hospital_bed_cap,
              ICU_bed_cap: cst.ICU_bed_cap,
              dateRange: null,
              gender:cst.gender
          };
        },
        created(){
            this.loadData()
        },
        methods:{
            loadData(){
                this.getCumulativeData();
                this.getRegionTotalData();
            },
            getCumulativeData(){
                new Promise(function(resolve, reject) {
                    $.getJSON("./data/cumulativeCases.json", function (rawData) {
                        var dates = rawData.filter(a=>a.date !== 'diff').map(function(d){return new Date(d.date);});

                        var dateMax = new Date(Math.max.apply(null,dates)),
                            dateMin = new Date(Math.min.apply(null,dates));
                        currentDate = dateMax.toISOString().slice(5, 7) + '/'
                            + dateMax.toISOString().slice(8, 10) + '/'
                            + dateMax.toISOString().slice(2, 4);

                        var range = {dateMax : dateMax, dateMin : dateMin};

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

                        if(Object.keys(processedData["new_cases"].data).length == rawData.length - 1){
                            resolve({data:processedData, range:range});
                        }
                    });
                }).then((data)=>{this.categories = data.data;  this.dateRange = data.range;})
            },
            getRegionTotalData(){
                new Promise(function(resolve, reject) {
                    $.getJSON("./data/currentTotalCases.json", function (rawData) {
                        var latestDayData = rawData.filter(function(d){return d.date === currentDate;})[0];
                        var regionData = latestDayData.case,
                            regionDeath = latestDayData.death;

                        if(Object.keys(regionDeath.regions).length === Object.keys(latestDayData.case.regions).length )
                            resolve({case:regionData,death:regionDeath})

                    })}).then((data)=>{this.regionData = data;})
            },
            getValue(data){
               return Object.values(data).map(a=>parseInt(a));
            },
            isCategoryToShow(category){
                return cst.categoryStatsToShow.indexOf(category) > -1;
            },
            getLable(category){
                return cst.labels[category];
            },
            getNumber(category){
                return parseInt(category.data[currentDate]);
            },
            togglePanel(e){
                    var $BOX_PANEL = $(e.target).closest('.x_panel'),
                        $ICON = $(e.target).find('i'),
                        $BOX_CONTENT = $BOX_PANEL.find('.x_content');

                    // fix for some div with hardcoded fix class
                    if ($BOX_PANEL.attr('style')) {
                        $BOX_CONTENT.slideToggle(200, function () {
                            $BOX_PANEL.removeAttr('style');
                        });
                    } else {
                        $BOX_CONTENT.slideToggle(200);
                        $BOX_PANEL.css('height', 'auto');
                    }
                    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
                },
            getPercent(a, b){
                return ((a/b)*100).toFixed(2);
            }
        }
    }
</script>

<style scoped>
</style>