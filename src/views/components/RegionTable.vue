<template>
    <table>
        <tbody>
        <tr>
            <th>Région</th>
            <th>Confirmé</th>
            <th>Décès</th>
        </tr>
        <tr class="region_elem" v-for="(region, x) in Object.keys(data.case.regions).sort()" v-bind:key = "x" v-bind:id="'mchi_region_'+region" @mouseover="mouseOver(region)" @mouseout="mouseOut(region)">
            <td>{{regionList[region].name}}</td>
            <td>{{numberFormat(data.case.regions[region])}}</td>
            <td>{{numberFormat(data.death.regions[region])}}</td>
        </tr>
        <tr>
            <th>Ensemble du Québec</th>
            <th>{{numberFormat(data.case.total)}}</th>
            <th>{{numberFormat(data.death.total)}}</th>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import cst from '@/const.js';
    import base from '@/base.js';
    window.jQuery = require('jquery');
    var $ = window.jQuery;
    require('jvectormap');

    export default {
        name: "RegionTable",
        data(){
            return{
                regionList: cst.regionList,
                numberFormat: base.numberFormat
            }
        },
        props: {
            data:{
                type: Object
            }
        },
        methods:{
            mouseOver(code){
                    var mapObj = $('#rss-map').vectorMap('get', 'mapObject');
                    mapObj.regions[code].element.setHovered(true);

            },
            mouseOut(code){
                var mapObj = $('#rss-map').vectorMap('get', 'mapObject');
                mapObj.regions[code].element.setHovered(false);

            }
        }
    }
</script>

<style scoped>
    table{
        width: 100%;
        font-size: 13px;
    }
    th, td{
        padding: 0 10px;
        line-height: 30px;
        border-top: 1px solid #eeeeee;
    }
    .region_elem{
        cursor: pointer;
    }
    .region_elem:hover{
        font-weight: bold;
    }
</style>