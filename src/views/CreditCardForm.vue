<template>
  <div v-if="movie && show" class="cont flex align-center space-evenly">
    <div class="payment-cont flex column align-center justify-center">
      <div class="col-50">
        <h3>Payment</h3>
        <label for="fname">Accepted Cards</label>
        <div class="icon-container">
          <i class="cards fa fa-cc-visa" style="color:navy;"></i>
          <i class="cards fa fa-cc-amex" style="color:blue;"></i>
          <i class="cards fa fa-cc-mastercard" style="color:red;"></i>
          <i class="cards fa fa-cc-discover" style="color:orange;"></i>
        </div>
        <label for="cname">Name on Card</label>
        <input
          type="text"
          id="cname"
          name="cardname"
          v-model="creditCardOwner"
          placeholder="John More Doe"
        />
        <label for="ccnum">Credit card number</label>
        <input
          type="text"
          id="ccnum"
          name="cardnumber"
          @input="formatCardNumber"
          v-model="cardNumber"
          placeholder="1111-2222-3333-4444"
        />
        <label for="expmonth">Exp Month</label>
        <input
          type="text"
          id="expmonth"
          @input="formatExpMonth"
          v-model="expMonth"
          name="expmonth"
          placeholder="03"
        />

        <div class="row">
          <div class="col-50">
            <label for="expyear">Exp Year</label>
            <input
              type="text"
              id="expyear"
              @input="formatExpYear"
              name="expyear"
              v-model="expYear"
              placeholder="2018"
            />
          </div>
          <div class="col-50">
            <label for="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              v-model="cvv"
              @input="formatCVV"
              name="cvv"
              placeholder="352"
            />
          </div>
        </div>
      </div>
      <button :disabled="validateForm" @click="next" class="btn">Checkout</button>
    </div>
    <div class="cart">
      <div class="col-25">
        <h3>Order Details</h3>
        <p>{{movie.title}}</p>
        <p>Date: {{show.date}}</p>
        <p>Time: {{show.time}}</p>
        <p>number of tickets: {{numOfTickets}}</p>
        <h4>Tickets Details</h4>
        <p v-for="(seat,idx) in seats" :key="idx">
          <a href="#">{{`Line: ${seat.location.y} Chair: ${seat.location.x}`}}</a>
          <span class="price">$15</span>
        </p>Total
        <span class="price" style="color:black">
          <b>{{seats.length*15}}$</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Movie } from "../services/Movie";
import { Show, SeatState, Seat } from "../services/Theater";
import { Payment } from "../services/Payment";
import { CinemaTicket } from "../services/CinemaTicket";

@Component({
  components: {},
})
export default class CreditCardForm extends Vue {
  creditCardOwner = "";
  cardNumber = "";
  expMonth = "";
  expYear = "";
  cvv = "";
  formatCardNumber($event: { inputType: string; data: number }) {
    if (
      $event.inputType !== "deleteContentBackward" &&
      (this.cardNumber.length === 4 ||
        this.cardNumber.length === 9 ||
        this.cardNumber.length === 14)
    )
      this.cardNumber += "-";
    else if (
      ($event.inputType !== "deleteContentBackward" && isNaN($event.data)) ||
      this.cardNumber.length > 19
    ) {
      this.cardNumber = this.cardNumber.replace(/.$/, "");
    }
  }
  formatExpMonth($event: { inputType: string; data: number }) {
    if (
      ($event.inputType !== "deleteContentBackward" && isNaN($event.data)) ||
      this.expMonth.length > 2
    ) {
      this.expMonth = this.expMonth.replace(/.$/, "");
    }
  }
  formatExpYear($event: { inputType: string; data: number }) {
    if (
      ($event.inputType !== "deleteContentBackward" && isNaN($event.data)) ||
      this.expYear.length > 4
    ) {
      this.expYear = this.expYear.replace(/.$/, "");
    }
  }
  formatCVV($event: { inputType: string; data: number }) {
    if (
      ($event.inputType !== "deleteContentBackward" && isNaN($event.data)) ||
      this.cvv.length > 3
    ) {
      this.cvv = this.cvv.replace($event.data.toString(), "");
    }
  }
  get numOfTickets() {
    return this.seats.length;
  }

  get seats(): Seat[] {
    return this.show.theater.seats.filter(
      (seat) => seat.state === SeatState.Selected
    );
  }
  get show(): Show {
    return this.$store.getters.currShow;
  }
  get movie(): Movie {
    return this.$store.getters.currMovie;
  }

  get isFormValid() {
    return false;
  }
  get validateForm() {
    if (
      this.creditCardOwner === "" ||
      this.cardNumber === "" ||
      this.cvv === "" ||
      this.expYear === "" ||
      this.expMonth === ""
    )
      return true;
    if (Number(this.expMonth) > 12 || Number(this.expMonth) < 1) return true;
    const date = new Date();
    if (
      Number(this.expYear) < date.getFullYear() ||
      Number(this.expYear) > date.getFullYear() + 6
    )
      if (
        this.cardNumber.length < 19 ||
        this.cvv.length < 3 ||
        this.expYear.length < 4 ||
        this.expMonth.length < 2
      )
        return true;
    return false;
  }

  async next() {
    const payment: Payment = {
      ownerName: this.creditCardOwner,
      carNum: this.cardNumber,
      expMonth: this.expMonth,
      expYear: this.expYear,
      cvv: this.cvv,
    };
    await this.$store.dispatch({ type: "savePayment", payment });
    const savedPayment = await this.$store.getters.currPayment;

    const tickets: CinemaTicket[] = [];

    this.show.theater.seats.forEach((seat: Seat) => {
      if (seat.state === SeatState.Selected) {
        const ticket: CinemaTicket = {
          movieName: this.movie.title,
          seat: seat,
          time: this.show.time,
          date: this.show.date,
          hall: this.show.theater.name,
          paymentId: savedPayment._id,
        };
        seat.state = SeatState.Occupied;
        tickets.push(ticket);
      }
    });
    await this.$store.dispatch({ type: "saveShow", show: this.show });
    await this.$store.dispatch({ type: "saveTickets", tickets });

    this.$router.push({
      path: "thankyou",
    });
  }
  prev() {
    // this.$router.push({ path: "/" });
  }
}
</script>

<style>
</style>