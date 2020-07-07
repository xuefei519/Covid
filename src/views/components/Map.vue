<template>
    <div class="map-container">
        <div id="rss-map" style="height:600px" class="jvmap-smart"></div>
    </div>
</template>

<script>
    import base from '@/base.js';

    window.jQuery = require('jquery');
    var $ = window.jQuery;
    require('jvectormap');

    export default {
        name: "Map",
        data(){
          return{
              numberFormat: base.numberFormat
          }
        },
        props:{
            data:{
                type: Object
            }
        },
        mounted(){
            this.drawMap();
        },
        methods:{
            drawMap(){
                let _this=this;
                $('#rss-map').empty();
                var map;
                map = $('#rss-map').vectorMap({
                    map: 'rss',
                    backgroundColor: null,
                    regionsSelectable: true,
                    regionStyle: {
                        hover:{
                            fill: "#eaf651"
                        },
                        selected: {
                            fill: '#eaf651'
                        }
                    },
                    series: {
                        regions: [{
                            values: this.data,
                            scale: ['#FDEDEC ', '#CB4335'],
                            normalizeFunction: 'polynomial',
                            legend: {
                                vertical: true
                            }
                        }]
                    },
                    onRegionClick: function(e, code){
                        var map = $("#rss-map").vectorMap("get", "mapObject");
                        if(map.getSelectedRegions().indexOf(code)<0)
                            map.clearSelectedRegions();
                    },
                    onRegionSelected: function(e, code){
                        var map = $("#rss-map").vectorMap("get", "mapObject");
                        if(map.getSelectedRegions().indexOf(code)<0)
                            $("#mchi_region_"+code+" *").css('font-weight','').css("color","");
                        else
                            $("#mchi_region_"+code+" *").css('font-weight','bold').css("color","#2A3F54");
                    },
                    onRegionOver: function(e, code) {
                        $("#mchi_region_" + code + " *").css('font-weight', 'bold').css("color","#2A3F54");
                    },
                    onRegionOut: function(e, code) {
                        var map = $("#rss-map").vectorMap("get", "mapObject");
                        if(map.getSelectedRegions().indexOf(code)<0)
                            $("#mchi_region_" + code + " *").css('font-weight', '').css("color","");
                    },
                    onRegionTipShow: function(e, el, code){
                        el.html(el.html()+' ('+base.numberFormat(_this.data[code])+' cas)');
                    }
                });
            }
        },
        watch:{
            data:function(){
                this.drawMap()
            }
        }
    }
</script>

