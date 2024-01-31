<!-- Menampilkan beberapa data grafik dalam satu highchart -->

<template>
    <div>
        <highchart :options="chartMultipleAxisOptions" />
    </div>
</template>

<script>
export default {
    async asyncData() {
        try {
            const response = await fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');
            const apiData = await response.json();

            // Konversi data API ke dalam format yang dapat digunakan oleh Highcharts
            const chartData = apiData.map(item => item.value);

            // Ambil data untuk xAxis dari API
            const xAxisCategories = apiData.map(item => item.provinsi);

            // Mengembalikan data untuk digunakan dalam template
            return { chartData, xAxisCategories };
        } catch (error) {
            console.error('Error:', error);
            return { chartData: [], xAxisCategories: [] };
        }
    },
    data() {
        return {
            chartMultipleAxisOptions: {
                chart: {
                    // type: 'column',
                },
                title: {
                    text: 'Data Kependudukan Indonesia tahun 2023',
                    align: 'left'
                },
                subtitle: {
                    text: 'Data Jumlah Penduduk per Provinsi',
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
                ],
                series: [
                    {
                        name: 'Jumlah Penduduk',
                        type: 'column',
                        data: this.chartData || [] // Menggunakan data dari panggilan API
                    },
                ],
                xAxis: {
                    categories: this.xAxisCategories || [],
                    title: {
                        text: 'Provinsi'
                    }
                },
                
            }
        }
    },
    mounted() {
        try {
            // Membuat grafik Highcharts setelah komponen di-mount
            Highcharts.chart('chartContainer', this.chartMultipleAxisOptions);
        } catch (error) {
            console.error('Error during mounted hook:', error);
        }
    }

}
</script>