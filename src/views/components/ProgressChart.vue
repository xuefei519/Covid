<template>
    <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="text-align: center">
            <v-progress-circular
                :rotate="-90"
                :size="130"
                :width="20"
                :value="value"
                color="#E74C3C"
            >{{value+"%"}}</v-progress-circular>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <p class="title">{{title}}</p>
            <span>{{subtitle}}</span>
            <div class="caseNumber">
                <p><span class="caseNumber">{{numberFormat(number)}}</span> cas</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuetify from "vuetify";
    import base from "@/base.js";

    export default {
        name: "ProgressChart",
        data(){
            return{
                numberFormat: base.numberFormat,
            }
        },
        vuetify: new Vuetify(),
        props:{
            value:{
                type:Number
            },
            title: {
                type: String,
                default: "",
                description: "Title of progressBar"
            },
            subtitle: {
                type: String,
                default: "",
                description: "Subitle of progressBar"
            },
            number: {
                type: Number
            }
        }
    }
</script>

<style scoped>
    .title{
    font-size: 18px;
    font-weight: bold;
    }
    .caseNumber *{
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
</style>