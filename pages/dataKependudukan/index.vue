<!-- Menampilkan beberapa data grafik dalam satu highchart -->

<template>
    <div>
        <highchart :options="chartMultipleAxisOptions" />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            chartMultipleAxisOptions: {
                chart: {},
                title: {
                    text: 'Data Kependudukan Indonesia tahun 2023',
                    align: 'center'
                },
                subtitle: {
                    text: 'Data Jumlah Penduduk per Provinsi',
                    align: 'center'
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    layout: 'horizontal',
                    reversed: false,
                },
                tooltip: {
                    shared: true,
                },
                yAxis: [
                    {
                        title: {
                            text: 'Jumlah Penduduk'
                        },
                    },  
                    {
                        title: {
                            text: 'Jumlah Penduduk km2'
                        },
                        labels: {
                            format: '{value} km2'
                        },
                        opposite: true,

                    },  
                ],
                series: [
                    {
                        name: 'Jumlah Penduduk',
                        type: 'column',
                        data: []
                    },
                    {
                        name: 'Jumlah Penduduk km2',
                        type: 'spline',
                        yAxis: 1,
                        tooltip: {
                            valueSuffix: 'km2'
                        },
                        // marker: {
                        //     enabled: false
                        // },
                        dashStyle: 'shortdot',
                        data: []
                    },
                    // {
                    //     name: 'Total',
                    //     type: 'pie',
                    //     size: 120,
                    //     center: [50, 44],
                    //     innerSize: '50%',
                    //     dataLabels: {
                    //         enabled: false
                    //     },
                    //     data: []
                    // }
                ],
                xAxis: {
                    categories: [],
                    title: {
                        text: 'Provinsi'
                    }
                }, 
            }
        };
    },

    async created() {
        try {
            const response = await axios.get('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');

            const data = response.data.data;

            const chartData = data.map((item) => ({
                name: item.prov,
                jumlahPenduduk: parseFloat(item.jumlah_penduduk),
                jumlahPendudukKm2: parseFloat(item.jumlah_penduduk_km2),
            }));

            this.chartMultipleAxisOptions.series[0].data = chartData.map(item => item.jumlahPenduduk);
            this.chartMultipleAxisOptions.series[1].data = chartData.map(item => item.jumlahPendudukKm2);
            this.chartMultipleAxisOptions.xAxis.categories = chartData.map(item => item.name);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    watch: {
        chartData: {
            handler(newVal) {
                if (newVal) {
                    this.chartMultipleAxisOptions.series[0].data = newVal.jumlahPenduduk;
                    this.chartMultipleAxisOptions.series[1].data = newVal.jumlahPendudukKm2;
                    this.chartMultipleAxisOptions.xAxis.categories = newVal.provinsiNames;
                }
            },
            deep: true,
        },
    },
};
</script>