<template>
    <v-chart :options="polar"/>
</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/chart/funnel'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/toolbox'
    import 'echarts/theme/fruit'

    var data = [],
        colorTheme = [
            '#6F0000',
            '#800000',
            '#8F0F01',
            '#9B220C',
            '#A53719',
            '#AB4C29',
            '#C37240',
            '#D7985B',
            '#E7BC7A',
            '#F3DAA1',
            '#FBF1CA'];

    export default {
        components: {
            'v-chart': ECharts
        },
        props:{
          value: {
              type: Object
          }
        },
        created(){
            for(var category in this.value){
                data.push({name: category, value: this.value[category]})
            }
        },
        data () {
            return {
                polar: {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} <br/> {c} ({d}%)'
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: '0',
                        data: Object.keys(this.value)
                    },
                    toolbox:{
                        show:true,
                        feature:{
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
                    series: [
                        {
                            name: 'Category',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '45%'],
                            data: data,
                            color: colorTheme,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }

        }
        }
    }
</script>

<style scoped>

</style>