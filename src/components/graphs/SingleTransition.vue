<script>
import { Line, mixins } from 'vue-chartjs'
import log from '@/modules/firebase/log'
export default {
  extends: Line,
  mixins: [mixins.reactiveData],
  props: {
    options: {
      type: Object,
      default: null
    },
    params: { type: Array },
    graphKey: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    }
  },
  watch: {
    params: {
      handler: async function(val) {
        if (val.length === 0) return
        this.chartData = this.format(this.params)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    format(params) {
      if (!params.length > 0) {
        return
      }
      const labels = []
      const datasets = [
        {
          label: params[0].label,
          lineTension: 0,
          borderColor: this.color,
          data: []
        }
      ]
      params.map(el => {
        datasets[0].data.push(el[this.graphKey])
        labels.push(el.date)
      })
      return { labels, datasets }
    }
  }
}
</script>
