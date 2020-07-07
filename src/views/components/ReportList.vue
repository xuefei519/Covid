<template>
    <div>
        <div v-for="(report, x) in reports" v-bind:key="x" class="report_elem">
            <p class="report-list-title">{{report.date}}</p>
            <div class="row">
                <ul class="report-list">
                    <li>
                        <a target="_blank" v-bind:href="report.link">{{lang==="en"? 'Report': 'Rapport'}}</a>
                    </li>
                    <li>
                        <a target="_blank" v-bind:href="report.methodology">{{lang==="en"? 'Methodological Details' : 'Détails méthodologiques'}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReportList",
        props:['lang'],
        data(){
            return{
                reports:[
                { date:"2020.05.08", link:"https://www.inesss.qc.ca/fileadmin/doc/INESSS/COVID-19/COVID-19_Projections.pdf", methodology: "reports/Modelisation_COVID_McGill_2020.05.08.pdf"},
                { date:"2020.04.25", link:"https://www.inspq.qc.ca/covid-19/donnees/projections/hospitalisation", methodology: "reports/Modelisation_COVID_McGill_2020.04.25.pdf"}
                ]
            }
        }
    }
</script>

<style scoped>

</style>