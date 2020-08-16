import Vue from 'vue';
import Vuex from 'vuex';
import { TheaterService } from '../services/theater.service';
const theaterService: TheaterService = new TheaterService();


Vue.use(Vuex)

import { TheaterMap, Show } from '@/services/Theater';
import { Movie } from '../services/Movie'
import { User } from '@/services/User';
import { Customer } from '@/services/Customer';
import { Payment } from '@/services/Payment';
import { CinemaTicket } from '@/services/CinemaTicket';

export interface RootState {
  currUser: User | null;
  movies: Movie[];
  currMovie: Movie | null;
  theaters: TheaterMap[];
  currShow: Show | null;
  currCustomer: Customer | null;
  currPayment: Payment | null;
  tickets: CinemaTicket[];
}
export default new Vuex.Store({

  state: {
    currUser: sessionStorage.getItem('user'),
    movies: [],
    currMovie: null,
    theaters: [],
    currShow: null,
    currCustomer: null,
    currPayment: null,
    tickets: []
  } as RootState,
  getters: {
    currShow(state): Show | null {
      return state.currShow;
    },
    movies(state): Movie[] {
      return state.movies;
    },
    currMovie(state): Movie | null {
      return state.currMovie;
    },
    currUser(state): User | null {
      return state.currUser;
    },
    currCustomer(state): Customer | null {
      return state.currCustomer;
    },
    currPayment(state): Payment | null {
      return state.currPayment;
    },
    tickets(state): CinemaTicket[] {
      return state.tickets;
    },
    theaters(state): TheaterMap[] {
      return state.theaters;
    }

  },

  mutations: {
    saveShow(state, { show }) {
      state.currShow = show;
    },
    getMovies(state, { movies }) {
      state.movies = movies;
    },
    setMovie(state, { movie }) {
      state.currMovie = movie;
    },
    setUser(state, { user }) {
      state.currUser = user;
    },
    setCustomer(state, { customer }) {
      state.currCustomer = customer;
    },
    setPayment(state, payment) {
      state.currPayment = payment;
    },
    setTickets(state, { tickets }) {
      state.tickets = tickets;
    },
    getTheaters(state, { theaters }) {
      state.theaters = theaters;
    },
  },
  actions: {
    async getShow({ commit }, { theaterId, movieId, date, time }): Promise<Show> {
      const show = await theaterService.getShow(theaterId, movieId, date, time);
      commit({ type: 'saveShow', show });
      return show;

    },
    async getMovie({ commit }, { movieId }): Promise<Movie> {
      const movie = await theaterService.getMovie(movieId);
      commit({ type: 'setMovie', movie });
      return movie;
    },
    async saveShow({ commit }, { show }) {

      const savedShow = await theaterService.saveShow(show);
      commit({ type: 'saveShow', show: savedShow });
    },
    async getMovies({ commit }) {
      const movies = await theaterService.getMovies();
      commit({ type: 'getMovies', movies })
    },
    async login({ commit }, { email, password }) {
      const user = await theaterService.login(email, password);
      commit({ type: 'setUser', user });
    },
    async logout({ commit }) {
      commit({ type: 'setUser', user: null });
    },
    async saveCustomer({ commit }, { email, name }) {
      const cust: Customer = { name, email }
      commit({ type: 'setCustomer', cust });
    },
    async savePayment({ commit }, { payment }) {
      payment._id = 'temp id';
      commit({ type: 'setPayment', payment });
    },
    async saveTickets({ commit }, { tickets }) {
      const savedTickets = await theaterService.saveTickets(tickets);
      commit({ type: 'setTickets', tickets: savedTickets })
    },
    async getTheaters({ commit }) {
      const theaters = await theaterService.getTheaters();
      commit({ type: 'getTheaters', theaters })
    },
    async saveMovie({ commit }, { movie }) {
      const savedMovie = await theaterService.saveMovie(movie);
      commit({ type: 'setMovie', savedMovie });
    },

  },
  modules: {
  }
})


