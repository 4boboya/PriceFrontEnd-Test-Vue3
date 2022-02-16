export interface IGameData {
    [name: string]: ILeague
}

export interface ILeague {
    [name: string]: IGame
}

export interface IGame {
    GameDate: string,
    GameID: string,
    GameTime: string,
    League: string,
    LeagueID: string,
    Live: string,
    ScoreA: number,
    ScoreH: number,
    TeamA: string,
    TeamH: string,
    Site: ISite | {},
    Status: IStatus
}

export interface ISite {
    [name: string]: IOdds
}

export interface IOdds {
    ID: string,
    [name: string]: IOdd | string
}

export interface IOdd {
    [name: string]: string | number
}

export interface IStatus {
    [name: string]: string
}