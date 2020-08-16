import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import TheaterMap from '../views/TheatreMap.vue'
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import MovieDetails from '../views/MovieDetails.vue';
import TicketInfo from '../views/TicketInfo.vue';
import CreditCardForm from '../views/CreditCardForm.vue';
import ThankYou from '../views/ThankYou.vue';
import AddEditMovie from '../views/AddEditMovie.vue';


Vue.use(VueRouter)

function guardMyroute(to: any, from: any, next: any) {
  let isAuthenticated = false;

  if (sessionStorage.getItem('user'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/movie/:id?',
    name: 'Movie',
    beforeEnter: guardMyroute,
    component: AddEditMovie
  },
  {
    path: '/moviedetails/:id',
    name: 'MovieDetails',
    component: MovieDetails
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ticketInfo',
    name: 'ticketInfo',
    component: TicketInfo,
    props: () => ({ query: 'movieId' })
  },
  {
    path: '/selectseats',
    name: 'Select Seats',
    component: TheaterMap,
    props: () => ({ query: 'numberOfTickets' })
  },
  {
    path: '/ticketspay',
    name: 'Tickets Pay',
    component: CreditCardForm,
  },
  {
    path: '/thankYou',
    name: 'thank you',
    component: ThankYou,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
