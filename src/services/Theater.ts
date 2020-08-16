export interface Point {
    x: number;
    y: number;
}
export interface TheaterObject {
    point: Point;
    width: number;
    height: number;
}

export enum SeatState {
    Available = 0,
    Occupied = 1,
    Selected = 2
}
export interface Seat extends TheaterObject {
    state: SeatState;
    location: Point;
}

export class TheaterMap implements TheaterObject {

    _id?: string;
    point = { x: 0, y: 0 };
    name = "";
    width = 0;
    height = 0;
    seats: Seat[] = [];
    screen: TheaterObject = { point: { x: 0, y: 0 }, width: 0, height: 0 };
}

export interface Show {
    _id?: string;
    movieId?: string;
    date: Date;
    time: string;
    theater: TheaterMap;
}
export interface Cell {
    cellType: CellType;
    point: Point;
}

export enum CellType {
    Empty = 0,
    Chair = 1,
    Screen = 2,
    CheckBox = 3,
    Number = 4
}













