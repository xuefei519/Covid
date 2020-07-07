<template>
    <v-chart :options="polar"/>
</template>

<style>
    /**
     * The default size is 600px×400px, for responsive charts
     * you may need to set percentage values as follows (also
     * don't forget to provide a size for the container).
     */
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/chart/funnel'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/toolbox'

    export default {
        components: {
            'v-chart': ECharts
        },
        data () {
            return {
                polar:  {
                    tooltip:{
                        trigger:"item",
                        formatter:"{a} <br/>{b} : {c} ({d}%)"
                    },
                    calculable:!0,
                    legend:{
                        x:"center",
                        y:"bottom",
                    },
                    color:['#64B5F6','#F06292 '],
                    toolbox:{
                        show:true,
                        feature:{
                            magicType:{
                                show:!0,
                                type:["pie","funnel"],
                                option:{
                                    funnel:{
                                        x:"25%",
                                        width:"50%",
                                        funnelAlign:"center",
                                        max:1000
                                    }
                                }
                            },
                            restore:{
                                show:true,
                                title:"Restaurer"
                            },
                            saveAsImage:{
                                show:true,
                                title:"Enregistrer l'image"
                            }
                        }
                    },
                    series:[{
                        name:"Répartition par genre",
                        type:"pie",
                        radius:["35%","55%"],
                        itemStyle:{
                            normal:{
                                label:{
                                    show:!0
                                },
                                labelLine:{
                                    show:!0
                                }
                            },
                            emphasis:{
                                label:{
                                    show:!0,
                                    position:"center",
                                    textStyle:{
                                        fontSize:"14",
                                        fontWeight:"normal"
                                    }
                                }
                            }
                        },
                        data:[
                            {value:41,name:"Hommes"},
                            {value:59,name:"Femmes"}
                        ]          // eventually replace by  // eventually change for JSON.parse(localStorage.getItem('men_women'))
                    }]
                }
            }
        }
    }
</script>