<!-- <template>
    <div>
      <highchart ref="chart" :options="chartMultipleAxisOptions" />
    </div>
  </template>
  
  <script>
  export default {
    // async asyncData() {
    //     try {
    //         const response = await fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');
    //         const apiData = await response.json();

    //         console.log('API Data:', apiData);

    //         // Konversi data API ke dalam format yang dapat digunakan oleh Highcharts
    //         const chartData = apiData.map(item => ({
    //         name: item.prov,
    //         y: parseFloat(item.jumlah_penduduk),
    //         }));

    //         // Mengembalikan data untuk digunakan dalam template
    //         return { chartData };
    //     } catch (error) {
    //         console.error('Error:', error);
    //         return { chartData: [] };
    //     }
    // },
    data() {
      return {
        // chartData: [],
        chartMultipleAxisOptions: {
          chart: {
            // type: 'column',
          },
          title: {
            text: 'Data Kependudukan Indonesia tahun 2023',
            align: 'left',
          },
          subtitle: {
            text: 'Data Jumlah Penduduk per Provinsi',
            align: 'left',
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'horizontal',
            reversed: false,
          },
          tooltip: {
            shared: true
          },
          yAxis: [
            {
              title: {
                text: 'Jumlah Penduduk',
              },
              labels: {
                    format: '{value}°C'
                }
            },
          ],
          series: [
            {
              name: 'Jumlah Penduduk',
              type: 'column',
              data: [],
            },
          ],
          xAxis: {
            categories: [],
            title: {
              text: 'Provinsi',
            },
          },
        },
      };
    },
    // updated() {
    //     try {
    //         console.log('Updated hook - Chart Data:', this.chartData);

    //         // Set data ke dalam grafik setelah komponen diperbarui
    //         this.$refs.chart.chart.series[0].setData(this.chartData, true);
    //         this.$refs.chart.chart.xAxis[0].setCategories(this.chartData.map(item => item.name), true);

    //         console.log('Chart successfully updated!');
    //     } catch (error) {
    //         console.error('Error during updated hook:', error);
    //     }
    // },
  };
  </script>
   -->

<!-- Menampilkan beberapa data grafik dalam satu highchart -->

<template>
    <div>
        <highchart :options="chartMultipleAxisOptions" />
    </div>
</template>

<script>
// import fetch from 'node-fetch';

export default {


    async asyncData() {
        try {
            const response = await this.$fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');
            const data = await response.json();

            // const data = response.data.data;

                    console.log(data);

            this.chartData.jumlahPenduduk = data.map((item) => item.jumlah_penduduk);
            this.chartData.jumlahPendudukKm2 = data.map((item) => item.jumlah_penduduk_km2);
            this.chartData.provinsiNames = data.map((item) => item.prov);

            // Memperbarui opsi grafik
            this.chartMultipleAxisOptions.series[0].data = this.chartData.jumlahPenduduk;
            this.chartMultipleAxisOptions.series[1].data = this.chartData.jumlahPendudukKm2;
            this.chartMultipleAxisOptions.xAxis.categories = this.chartData.provinsiNames;

        } catch (error) {
            console.error('Error fetching data:', error);
            error({ statusCode: 500, message: 'Failed to fetch data from the API' });
            return { error: true };
        }
    },

    // async fetch() {
    //     try {
    //         const response = await this.$fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');

    //         const data = response.data.data;

    //         this.chartData.jumlahPenduduk = data.map((item) => item.jumlah_penduduk);
    //         this.chartData.jumlahPendudukKm2 = data.map((item) => item.jumlah_penduduk_km2);
    //         this.chartData.provinsiNames = data.map((item) => item.prov);

    //         // Memperbarui opsi grafik
    //         this.chartMultipleAxisOptions.series[0].data = this.chartData.jumlahPenduduk;
    //         this.chartMultipleAxisOptions.series[1].data = this.chartData.jumlahPendudukKm2;
    //         this.chartMultipleAxisOptions.xAxis.categories = this.chartData.provinsiNames;

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         error({ statusCode: 500, message: 'Failed to fetch data from the API' });
    //         return { error: true };
    //     }
    // },

    data() {
        return {
            chartData: {
                jumlahPenduduk: [],
                jumlahPendudukKm2: [],
                provinsiNames: []
            },
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
                        // data: [5471625, 15401904, 5701545, 6794944, 3726004, 8813243, 2078958, 9001424, 1502367, 11350328]
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
                        // data: [56834.746, 72460.744, 42119.542, 89935.896, 49026.579, 86771.684, 20128.34, 33570.264, 16690.129, 660.982]
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
                    //     data: [
                    //         {
                    //             name: 'Aceh',
                    //             y: 517
                    //         },
                    //         {
                    //             name: 'Sumatera Utara',
                    //             y: 590
                    //         },
                    //         {
                    //             name: 'Sumatera Barat',
                    //             y: 517
                    //         },
                    //         {
                    //             name: 'Riau',
                    //             y: 590
                    //         },
                    //         {
                    //             name: 'Jambi',
                    //             y: 517
                    //         },
                    //         {
                    //             name: 'Sumatera Selatan',
                    //             y: 590
                    //         },
                    //         {
                    //             name: 'Bengkulu',
                    //             y: 517
                    //         },
                    //         {
                    //             name: 'Lampung',
                    //             y: 590
                    //         }
                    //     ]
                    // }
                ],
                xAxis: {
                    categories: [], // Menggunakan properti provinsiNames
                    // categories: ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'DKI Jakarta'],
                    title: {
                        text: 'Provinsi'
                    }
                },
                
            }
        }
    },

    // mounted () {
    //     this.getchartMultipleAxisOptions;
    // },
    
    // methods: {
    //     getchartMultipleAxisOptions() {
    //         axios.get(`https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023`).then(res => {
    //             this.chartMultipleAxisOptions = res.data;

    //         })
    //     }
    // }

//     watch: {
//     chartData: {
//       handler(newValue) {
//         console.log('Watch - Chart Data:', newValue);
//       },
//       immediate: true,
//     },
//   },
}

// async asyncData({ $fetch }) {
    //     try {
    //         const response = await $fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');
    //         const data = response.data.data;

    //         const jumlahPenduduk = data.map((item) => item.jumlah_penduduk);
    //         const jumlahPendudukKm2 = data.map((item) => item.jumlah_penduduk_km2);
    //         const provinsiNames = data.map((item) => item.prov);

    //         return { jumlahPenduduk, jumlahPendudukKm2, provinsiNames };
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         return { error: true };
    //     }
    // },

    // mounted() {
    //     // Update the component's data after asyncData fetch
    //     this.chartData.jumlahPenduduk = this.$data.jumlahPenduduk;
    //     this.chartData.jumlahPendudukKm2 = this.$data.jumlahPendudukKm2;
    //     this.chartData.provinsiNames = this.$data.provinsiNames;

    //     this.chartMultipleAxisOptions.series[0].data = this.chartData.jumlahPenduduk;
    //     this.chartMultipleAxisOptions.series[1].data = this.chartData.jumlahPendudukKm2;
    //     this.chartMultipleAxisOptions.xAxis.categories = this.chartData.provinsiNames;
    // },
    
</script>


