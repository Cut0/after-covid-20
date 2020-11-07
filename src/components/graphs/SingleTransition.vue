<script>
import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    },
    chartData: {
      type: Object
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
