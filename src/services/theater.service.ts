import { TheaterMap, Show } from './Theater';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';
import { Movie } from './Movie';
import { User } from './User';
import { HttpService } from './http.service';
import { CinemaTicket } from './CinemaTicket';

export class TheaterService {

    private storageService: StorageService = new StorageService();
    private utilsService: UtilsService = new UtilsService();
    private httpService: HttpService = new HttpService();

    async getShow(theaterId: string, movieId: string, date: Date, time: string): Promise<Show> {
        const show = await this.httpService.get(`show?theaterId=${theaterId}&movieId=${movieId}&date=${date.toDateString()}&time=${time}`, null);
        return show;
    }

    async saveMovie(movie: Movie) {
        const savedMovie = await this.httpService.post('movie', movie);
        return savedMovie;
    }
    async getTheaters(): Promise<TheaterMap[]> {
        const theaters = this.httpService.get('theater', null);
        return theaters;
    }
    async saveShow(savedShow: Show): Promise<Show> {
        const show = this.httpService.post('show', savedShow);
        return show;
    }
    async getMovies(): Promise<Movie[]> {
        const movies = this.httpService.get('movie', null);
        return movies;
    }
    async getMovie(id: string): Promise<Movie> {
        const movie = this.httpService.get(`movie/${id}`, null);
        return movie;

    }
    getEmptyMovie(): Movie {
        const movie: Movie = { title: "", desc: "", img: "", trailer: "", length: "" };
        return movie;
    }
    async login(email: string, password: string): Promise<User> {
        const user = await this.httpService.post('auth/login', { email, password });
        return this.handleLogin(user);
    }
    async saveTickets(tickets: CinemaTicket[]) {
        const savedTickets = this.httpService.post('ticket', tickets);
        return savedTickets;
    }
    private handleLogin(user: User) {
        sessionStorage.setItem('user', JSON.stringify(user))
        return user;
    }
}