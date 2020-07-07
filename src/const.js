const categoryStatsToShow = ['confirmed', 'death', 'recovered', 'hospitalized', 'ICU', 'tested'];

const labels = {
        'confirmed': 'Nombre cas',
        'active': 'Cas actif',
        'new_cases': 'Nouveaux cas',
        'death': 'Décès',
        'new_death': 'Nouveaux décès',
        'recovered': 'Rétablis',
        'hospitalized': 'Hospitalisés',
        'ICU': 'Soin intensif',
        'tested': 'Tests effectués',
        'new_tested': 'Nouveaux testé'
    };

const categoryFlotToShow = ['confirmed','new_cases','active', 'death', 'new_death', 'hospitalized', 'tested', 'new_tested'];

const regionList = {
    "01":{name:"Bas Saint Laurent",population:197322,population_65_plus:51121},
    "02":{name:"Saguenay Lac Saint Jean",population: 277796,population_65_plus:63514},
    "03":{name:"Capitale Nationale",population: 750645,population_65_plus:159777},
    "04":{name:"Mauricie et Centre du Québec",population:520285,population_65_plus:68424},
    "05":{name:"Estrie",population: 328998,population_65_plus:72969},
    "06":{name:"Montréal",population: 2052910,population_65_plus:336632},
    "07":{name:"Outaouais",population:397193,population_65_plus:65427},
    "08":{name:"Abitibi Témiscamingue",population:147542,population_65_plus:28405},
    "09":{name:"Côte Nord",population:90704,population_65_plus:17756},
    "10":{name:"Nord du Québec",population:13633,population_65_plus:2126},
    "11":{name:"Gaspésie Îles de la Madeleine",population: 90334,population_65_plus:24881},
    "12":{name:"Chaudière Appalaches",population: 428618,population_65_plus:93816},
    "13":{name:"Laval",population: 438973,population_65_plus:77500},
    "14":{name:"Lanaudière",population:515448,population_65_plus:95572},
    "15":{name:"Laurentides",population: 620294,population_65_plus:117426},
    "16":{name:"Montérégie",population:1582067,population_65_plus:302536},
    "17":{name:"Nunavik",population:14102,population_65_plus:625},
    "18":{name:"Terres Cries de la Baie James",population: 18131,population_65_plus:1110},
};

const __maximum_bed_capacity  = 15700;
const __maximum_UCI_capacity  = 1000;

const gender = {
    '0-9 ans':      1629,
    '10-19 ans':	2490,
    '20-29 ans':	6967,
    '30-39 ans':	7030,
    '40-49 ans':	8308,
    '50-59 ans':	8028,
    '60-69 ans':	4930,
    '70-79 ans':	4263,
    '80-89 ans':	6552,
    '90 ans et plus':	4613
};

export default {
    categoryStatsToShow: categoryStatsToShow,
    categoryFlotToShow: categoryFlotToShow,
    labels: labels,
    regionList: regionList,
    hospital_bed_cap: __maximum_bed_capacity,
    ICU_bed_cap: __maximum_UCI_capacity,
    gender: gender
}