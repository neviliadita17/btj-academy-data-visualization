<!-- Menampilkan beberapa data grafik dalam satu highchart -->

<template>
    <div>
        <highchart :options="chartOptions" />
    </div>

    <div>
        <highchart :options="chartMultipleAxisOptions" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartOptions: {
                chart: {
                    // type: 'column',
                },
                title: {
                    text: 'Statistik data Penduduk Surabaya',
                    align: 'left'
                },
                subtitle: {
                    text: 'Data Penduduk Surabaya pada tahun 2019 sampai 2024',
                    align: 'left'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal',
                    reversed: false,
                },
                tooltip: {
                    // formatter: function() {
                    //     // console.log(this.points)
                    //     return [`<b>Tahun ${this.x}</b> </br>`].concat(
                    //         this.points ? this.points.map(point => {
                    //             return `Jumlah ${point.series.name}: ${point.y} <br />`
                    //         }) : []
                    //     )
                    // },
                    shared: true,
                },
                series: [
                    {
                        name: 'Pria',
                        type: 'column',
                        data: [70, 80, 120, 125, 122]
                    },
                    {
                        name: 'Wanita',
                        type: 'column',
                        data: [75, 88, 130, 145, 152]
                    },
                    {
                        name: 'Rata-rata',
                        type: 'line',
                        step: 'center',
                        data: [72.5, 84, 125, 135, 137]
                    },
                    {
                        name: 'Total',
                        type: 'pie',
                        size: 120,
                        center: [50, 44],
                        innerSize: '50%',
                        dataLabels: {
                            enabled: false
                        },
                        data: [
                            {
                                name: 'Pria',
                                y: 517
                            },
                            {
                                name: 'Wanita',
                                y: 590
                            }
                        ]
                    }
                ],
                xAxis: {
                    categories: [2020, 2021, 2022, 2023, 2024],
                    title: {
                        text: 'Tahun'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Penduduk'
                    },
                    labels: {
                        format: '{value}M'
                    }
                },
            },

            chartMultipleAxisOptions: {
                chart: {
                    // type: 'column',
                },
                title: {
                    text: 'Prakiraan Cuaca Bulanan',
                    align: 'left'
                },
                subtitle: {
                    text: 'Prakiraan Cuaca Bulanan tahun 2024',
                    align: 'left'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal',
                    reversed: false,
                },
                yAxis: [
                    {
                        title: {
                            text: 'Temperatur'
                        },
                        labels: {
                            format: '{value}°C'
                        }
                    },  
                    {
                        title: {
                            text: 'Kelembapan Udara'
                        },
                        labels: {
                            format: '{value}%'
                        }
                    }, 
                    {
                        title: {
                            text: 'Kecepatan Angin'
                        },
                        labels: {
                            format: '{value} km/jam'
                        },
                        opposite: true,
                    },    
                ],
                series: [
                    {
                        name: 'Temperatur',
                        type: 'column',
                        tooltip: {
                            valueSuffix: '°C'
                        },
                        data: [25, 26, 25, 28, 29, 30, 31, 34, 30, 35, 31, 29]
                    },
                    {
                        name: 'Kelembapan Udara',
                        type: 'spline',
                        yAxis: 1,
                        tooltip: {
                            valueSuffix: '%'
                        },
                        // marker: {
                        //     enabled: false
                        // },
                        dashStyle: 'shortdot',
                        data: [85, 87, 89, 90, 92, 88, 89, 95, 97, 92, 93, 90]
                    },
                    {
                        name: 'Kecepatan Angin',
                        type: 'spline',
                        yAxis: 2,
                        tooltip: {
                            valueSuffix: ' km/jam'
                        },
                        data: [12, 14, 18, 20, 16, 17, 14, 16, 18, 13, 18, 14]
                    }
                ],
                xAxis: {
                    categories: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                    title: {
                        text: 'Bulan'
                    }
                },
                
            }
        }
    }
}
</script>