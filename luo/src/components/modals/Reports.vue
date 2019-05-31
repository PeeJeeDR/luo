<template>
  <div class='reports'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
      <div>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Report quiz</h3>

          <div class='reports-container'>
            <div class='report flex align-center' v-for='report in reports' :key='report.id' @click='onReportClick(report.type)'>
              <check-mark :checked='selectedReports.includes(report.type)'/>
              <p>{{ report.report }}</p>
            </div>
          </div>
        </section>

        <section>
          <textarea v-model='reportMessage' placeholder='Describe your report.' class='default-input textarea'></textarea>
        </section>

        <submit-and-cancel @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='onFormSubmit'/>
      </div>
    </transition>
  </div>
</template>

<script>
import app from '@/settings/app.json';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';
import { mapState } from 'vuex';

export default {
  name: 'Reports',
  components: { CheckMark, SubmitAndCancel },
  data: () => ({
    reports: app.reports,
    selectedReports: [],
    reportMessage: ''
  }),
  computed: {
    ...mapState('Reports', ['quizToBeReported', 'currentQuestion'])
  },
  methods: {
    onReportClick (reportType) {
      if (this.selectedReports.includes(reportType)) {
        let index = this.selectedReports.indexOf(reportType);
        index > -1 && this.selectedReports.splice(index, 1);
      } 
      else {
        this.selectedReports.push(reportType);
      }
    },

    onFormSubmit () {
      console.log('QUIZ TO BE REPORTED', this.quizToBeReported);
      console.log('CURRENT QUESTION', this.currentQuestion);

      this.$store.dispatch('Reports/postNewReport', {
        quizToBeReported: this.quizToBeReported,
        currentQuestion: this.currentQuestion,
        selectedReports: this.selectedReports,
        reportMessage: this.reportMessage
      }) 
    }
  }
}
</script>

<style lang='scss' scoped>
.reports
{
  .reports-container {
    margin-top: 2rem;

    .report {
      margin-bottom: 1rem;
    }
  }
}
</style>