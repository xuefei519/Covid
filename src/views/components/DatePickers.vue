<template>
    <date-range-picker
            @update="update()"
            :locale-data="locale"
            :dateRange="dateRange"
            :opens="opens"
            :ranges="ranges"
            v-model="dateRange"
    >
    </date-range-picker>
</template>
<script>
    import { bus } from '@/main.js';
    import DateRangePicker from 'vue2-daterange-picker';
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
    import moment from 'moment';

    window.jQuery = require('jquery');
    var $ = window.jQuery;

    var dateMin, dateMax ;

export default {
    components: { DateRangePicker },
    props:{
        range:{
            type: Object
        }
    },
    data(){
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var week = new Date();
        week.setDate(today.getDate() - 6);
        var month = new Date();
        month.setDate(today.getDate() - 29);

        var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        var thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        var lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
        var lastMonthEnd = new Date(today.getFullYear(), today.getMonth() , 0);

        dateMin = this.range.dateMin;
        dateMax = this.range.dateMax;

        return {
            dateRange:{
                startDate: dateMin,
                endDate: dateMax
            },
            opens:"left",
            locale: {
                direction: 'ltr', //direction of text
                separator: ' - ', //separator between the two ranges
                applyLabel: 'Soumettre',
                cancelLabel: 'Annuler',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
                monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
                firstDay: moment.localeData().firstDayOfWeek() //ISO first day of week - see moment documenations for details
            },
            ranges: {
                    'Dernière Jour': [today, today],
                    'Les 7 Dernière Jours': [week,today],
                    'Les 30 Dernière Jours': [month, today],
                    'Ce Mois-ci': [thisMonthStart, today],
                    'Le Mois Dernière': [lastMonthStart, lastMonthEnd],
                    'Tout': [lastMonthStart, today]
                }
        }
    },
    methods:{
        update(){
            console.log(this.dateRange);
            bus.$emit('updateRange', this.dateRange);
        }
    }

};
</script>
<style>
    .reportrange-text{
        height:100% !important
    }
</style>