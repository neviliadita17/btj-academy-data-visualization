// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'BTJ Academy',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content: 'Contoh web sederhana BTJ Academy'
        }
      ]
    }
  },
  ssr: false,
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    ['nuxt-highcharts', { 
      setOptions: {
        colors: ['#86A7FC', '#FF9843', '#3468C0', '#FFDD95'],
        chart: {
          backgroundColor: 'transparent'
        },
        lang: {
          downloadPNG: 'Unduh Gambar PNG',
          downloadJPEG: 'Unduh Gambar JPEG',
          downloadPDF: 'Unduh File PDF'
        },
        credits: {
          enabled: false
        }
      }
     }]
  ],
});