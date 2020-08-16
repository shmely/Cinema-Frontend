<template>
  <section ref="tickets" v-if="tickets" class="thank-you flex column align-center">
    <!-- <h1>Thank you, enjoy the movie!!!</h1> -->
    <!-- <span class="btn-send-mail" @click="print">Print tickets</span> -->
    <Ticket v-bind:ticket="ticket" v-for="(ticket,idx) in tickets" :key="idx"></Ticket>
    <!-- <span class="btn-send-mail">Send Tickets by Email</span> -->
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CinemaTicket } from "../services/CinemaTicket";
import Ticket from "../components/Ticket.vue";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

@Component({
  components: {
    Ticket,
  },
})
export default class ThankYou extends Vue {
  get tickets(): CinemaTicket[] {
    const tickets = this.$store.getters.tickets;
    return tickets;
  }

  $refs!: {
    tickets: HTMLElement;
  };

  print() {
    //TODO: I can do better then this
    // const filename = "ThisIsYourPDFFilename.pdf";
    // html2canvas(this.$refs.tickets,{scale: 1}).then((canvas) => {
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
    //   pdf.save(filename);
    // });
  }
}
</script>

<style>
</style>