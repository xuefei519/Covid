<template>
        <div class="tile_stats_count  x_panel">
            <div class="numberStats">
                <span class="count_top">{{label}}</span>
                <div class="count">{{numberFormat(number)}}</div>
                <span class="count_bottom"><i v-bind:class="getArrowClass(diff)"></i><span v-bind:class="getClass(diff)">{{diff}}%</span> Depuis hier</span>
            </div>
            <v-sparkline
                    :value="value"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
            ></v-sparkline>
        </div>
</template>

<script>
    import Vuetify from "vuetify";
    import base from '@/base.js';

    const gradients = [
        ['#525f7f'],
        ['#42b3f4'],
        ['red', 'orange', 'yellow'],
        ['purple', 'violet'],
        ['#00c6ff', '#F0F', '#FF0'],
        ['#f72047', '#ffd200', '#1feaea'],
    ];
    export default {
        name: "TopStat",
        vuetify: new Vuetify(),
        props:{
            value:{
              type: Array
          },
            label:{
              type: String
            },
            diff:{
                type: Number
            },
            number:{
                type: Number
            }
        },
        data(){
            return {
                numberFormat: base.numberFormat,
                width: 2,
                radius: 10,
                padding: 8,
                lineCap: 'round',
                gradient: gradients[0],
                gradientDirection: 'top',
                fill: false,
                type: 'trend',
                autoLineWidth: false};
        },
        methods:{
            getClass(num){
                if(num<0){
                    if(this.label === 'Tests effectués' || this.label === 'Tests effectués')
                        return 'asc';
                    else
                        return 'desc';
                }
                else if(num>0){
                    if(this.label === 'Tests effectués' || this.label === 'Tests effectués')
                        return 'desc';
                    else return 'asc';
                }
            },
            getArrowClass(num){
                if(num<0){
                    if(this.label === 'Tests effectués' || this.label === 'Tests effectués')
                        return 'fa fa-sort-asc asc';
                    else
                        return 'fa fa-sort-desc desc';
                }
                else if(num>0){
                    if(this.label === 'Tests effectués' || this.label === 'Tests effectués')
                        return 'fa fa-sort-desc desc';
                    else return 'fa fa-sort-asc asc';
                }
            }
        }
    }
</script>

<style scoped>

</style>