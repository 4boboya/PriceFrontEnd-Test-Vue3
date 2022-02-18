import { IStringDict } from "./Global"

export interface IHotGame {
    [name: string]: IGame
}

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

export interface IReqApiLiveGame {
    gameType: string,
}

export interface IResApiGame {
    gameDate: string
    gameID: string
    gameStatus: string
    gameTime: string
    league: string
    leagueID: string
    liveUrl: string
    score1: number
    score2: number
    team1: string
    team1ID: string
    team2: string
    team2ID: string
    siteGameDtos: Array<ISiteGameDtos>
}

export interface ISiteGameDtos {
    gameDate: string
    gameID: string
    gameStatus: string
    gameTime: string
    league: string
    leagueID: string
    playByPlay: IPlayByPlay
    requestTime: number
    score1: number
    score2: number
    scores: number
    site: string
    team1: string
    team1ID: string
    team2: string
    team2ID: string
    odds: Array<ISiteOdds>
}

export interface IPlayByPlay {
    [name: string]: any
}

export interface ISiteOdds {
    playMode: string
    prices: Array<ISitePrices>
}

export interface ISitePrices {
    main: boolean
    spread: string
    odds: Array<ISiteOddInfo>
}

export interface ISiteOddInfo {
    odd: number
    oddType: string
}

export interface ITidyDataRes {
    liveDatas: IGameData
    leagueMapping: IStringDict
    gameMapping: IStringDict
}

export interface ITidyHotGameDataRes {
    hotGames: IHotGame
    gameMapping: IStringDict
}

export interface IWSData {
    GameType: string,
    Site: string,
    GameID: string,
    GameDate: string,
    GameTime: string,
    League: string,
    GameStatus: string,
    RequestTime: number,
    Scores: Array<IWSScores>,
    Team1: string,
    Team2: string,
    Score1: number,
    Score2: number,
    PlayByPlay: Array<IWSPlayByPlay> | null,
    Odds: Array<IWSOdds>
}

export interface IWSScores {
    Match: string,
    ScoreTeam1: number,
    ScoreTeam2: number
}

export interface IWSPlayByPlay {
    Key: string,
    Value: string,
}

export interface IWSOdds {
    PlayMode: string
    Prices: Array<IWSPrices>
}

export interface IWSPrices {
    Main: boolean
    Spread: string
    Odds: Array<IWSOddInfo>
}

export interface IWSOddInfo {
    Odd: number
    OddType: string
}