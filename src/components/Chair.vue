<template>
  <div class="chair" @click="selectSeat" v-bind:style="seatStyle">
    <div class="inner-chair" v-bind:style="innrChairStyle"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop, Emit } from "vue-property-decorator";
import { Seat, SeatState } from "../services/Theater";
import Component from "vue-class-component";

@Component({
  name: "Chair",
})
export default class Chair extends Vue {
  @Prop() seat!: Seat;
  @Prop() numberOfTickets!: number;
  @Prop() selectedSeats!: number;

  selectSeat() {
    if (this.seat.state === SeatState.Available) {
      if (this.selectedSeats >= this.numberOfTickets) {
        alert("more tickets then you chose");
        return;
      }

      this.seat.state = SeatState.Selected;
      this.setSelectedSeats(1);
    } else if (this.seat.state === SeatState.Selected) {
      this.seat.state = SeatState.Available;
      this.setSelectedSeats(-1);
    }
  }

  @Emit()
  setSelectedSeats(n: number) {
    return n;
  }

  get seatStyle() {
    return {
      "grid-column": `${this.seat.point.x + 1}`,
      "grid-row": `${this.seat.point.y}`,
    };
  }

  get innrChairStyle() {
    let chairColor: string;
    switch (this.seat.state) {
      case SeatState.Available: {
        chairColor = "#ffffff";
        break;
      }
      case SeatState.Selected: {
        chairColor = "#008000";
        break;
      }
      case SeatState.Occupied: {
        chairColor = "#FF0000";
        break;
      }
      default: {
        chairColor = "#ffffff";
        break;
      }
    }
    return {
      "background-color": chairColor,
    };
  }
}
</script>
<style>
</style>