import { IGameData, ILeague, IGame, ISite, IOdds, IOdd, ISiteOdds, IResApiGame, ISiteGameDtos, ISitePrices, ISiteOddInfo, IStatus,
        IWSLiveData, IWSPlayByPlay, IWSOdds, IWSPrices, IWSOddInfo } from "@/type/Game"
import { IDict, IStringDict } from "@/type/Global"
import vuex from "@/store"

const siteModel = {
  "bet365.com": {} as IOdds,
  "betfair.com": {} as IOdds,
  "bwin.com": {} as IOdds,
  "ku888": {} as IOdds,
  "twsl": {} as IOdds,
  "pinnacle.com": {} as IOdds,
} as ISite

export const tidyApiData = (liveDtos: Array<IResApiGame>) => {
    const liveDatas: IGameData = {}
    let leagueMapping: IStringDict = {}
    let gameMapping: IStringDict = {}
    if (liveDtos == null || liveDtos.length <= 0) return
    liveDtos.forEach((item: IResApiGame) => {
        if (item.gameStatus == "Final") return
        const gameData = {} as IGame;
        if (!Object.keys(liveDatas).includes(item.leagueID)) {
            liveDatas[item.leagueID] = {} as ILeague
        }
        const { siteData, siteMergeLeagueMapping, siteMergeGameMapping } = tidySite(item.siteGameDtos, item.leagueID, item.gameID);
        gameData.GameDate = item.gameDate.replace("-", "*").replace(/20.+\*/, "").replace("-", "/");
        gameData.LeagueID = item.leagueID;
        gameData.League = item.league;
        gameData.GameID = item.gameID;
        gameData.GameTime = item.gameTime;
        gameData.TeamH = item.team1;
        gameData.TeamA = item.team2;
        gameData.ScoreH = item.score1;
        gameData.ScoreA = item.score2;
        gameData.Live = item.liveUrl
        gameData.Site = siteData;
        leagueMapping = Object.assign(leagueMapping, siteMergeLeagueMapping)
        gameMapping = Object.assign(gameMapping, siteMergeGameMapping)
        liveDatas[item.leagueID][item.gameID] = gameData
    });
    vuex.dispatch("Live/SetGameDatas", liveDatas)
    vuex.dispatch("Live/SetSiteLeagueMapping", leagueMapping)
    vuex.dispatch("Live/SetSiteGameMapping", gameMapping)
}

const tidySite = (siteDtos: Array<ISiteGameDtos>, lid: string, gid: string) => {
    const siteData: ISite = JSON.parse(JSON.stringify(siteModel));
    const siteMergeLeagueMapping: IDict<string> = {}
    const siteMergeGameMapping: IDict<string> = {}
    siteDtos.forEach((siteItem: ISiteGameDtos) => {
        siteMergeLeagueMapping[siteItem.gameID] = lid
        siteMergeGameMapping[siteItem.gameID] = gid
        siteData[siteItem.site] = singleSiteAPI(siteItem)
    });
    return { siteData: siteData, siteMergeLeagueMapping: siteMergeLeagueMapping, siteMergeGameMapping: siteMergeGameMapping};
}

const singleSiteAPI = (siteItem: ISiteGameDtos) => {
    const siteData: IOdds = {
        "ID": siteItem.gameID,
        "HA": {},
        "1X2": {},
        "OU": {},
    };
    siteItem.odds.forEach((oddItem: ISiteOdds) => {
        if (oddItem.playMode.includes("OU")) {
            siteData['OU'] = getOU(oddItem)
        } else if (oddItem.playMode.includes("HA")) {
            const { HA, X } = getHA(oddItem);
            siteData['HA'] = HA
            siteData['1X2'] = X
        }
    });

    return siteData
}

const getOU = (ou: ISiteOdds) => {
    const ouData: IOdd = {};
    ou.prices.forEach((priceItem: ISitePrices) => {
        if (priceItem.main) {
            ouData['spread'] = `o${priceItem.spread}`
            priceItem.odds.forEach((oddItem: ISiteOddInfo) => {
                if (oddItem.oddType == "O") {
                    ouData['o'] = oddItem.odd
                } else if (oddItem.oddType == "U") {
                    ouData['u'] = oddItem.odd
                }
            });
        }
    });
    return ouData;
}

const getHA = (ha: ISiteOdds) => {
    const haData: IDict<IOdd> = { HA: {}, X: {} };
    ha.prices.forEach((priceItem: ISitePrices) => {
        if (priceItem.main) {
            if (priceItem.spread == "1X2") {
                haData["X"]["spread"] = priceItem.spread
                priceItem.odds.forEach((oddItem: ISiteOddInfo) => {
                    if (oddItem.oddType == "H") {
                        haData["X"]['h'] = oddItem.odd
                    } else if (oddItem.oddType == "A") {
                        haData["X"]['a'] = oddItem.odd
                    }
                });
            } else {
                haData["HA"]["spread"] = priceItem.spread
                priceItem.odds.forEach((oddItem: ISiteOddInfo) => {
                    if (oddItem.oddType == "H") {
                        haData["HA"]['h'] = oddItem.odd
                    } else if (oddItem.oddType == "A") {
                        haData["HA"]['a'] = oddItem.odd
                    }
                });
            }
        }
    });
    return haData;
}

export const tidyWSData = (wsDataStr: string) => {
    // console.log(wsDataStr)
    if (wsDataStr.includes('DeCompress Error')) return
    const leagueMapping = vuex.getters["Live/GetSiteLeagueMapping"]
    const gameMapping = vuex.getters["Live/GetSiteGameMapping"]
    const wsData = JSON.parse(wsDataStr);
    const siteGames: Array<IWSLiveData> = wsData.SiteGames
    const liveDatas: IGameData = JSON.parse(JSON.stringify(vuex.getters["Live/GetGameDatas"])) as IGameData
    siteGames.forEach((siteGame: IWSLiveData) => {
        const LID = leagueMapping[siteGame.GameID]
        const GID = gameMapping[siteGame.GameID]
        if (LID == undefined || GID == undefined) return
        if ((siteGame.Site == "bet365.com" || siteGame.Site == "ku888") && siteGame.GameStatus == "InProgress") {
            liveDatas[LID][GID].ScoreH = siteGame.Score1;
            liveDatas[LID][GID].ScoreA = siteGame.Score2;
            if (siteGame.PlayByPlay != null) {
                liveDatas[LID][GID].Status = getStatus(siteGame.PlayByPlay);
            }
        }
        const site: ISite = liveDatas[LID][GID].Site
        site[siteGame.Site] = getOdds(siteGame)
        liveDatas[LID][GID].Site = site
    })
    vuex.dispatch("Live/SetGameDatas", liveDatas)
}

const getStatus = (playByPlay: Array<IWSPlayByPlay>) => {
    const status: IStatus = {}
    playByPlay.forEach((item: IWSPlayByPlay) => {
        status[item.Key] = item.Value
    })
    return status
}

const getOdds = (siteItem: IWSLiveData) => {
    const siteData: IOdds = {
        "ID": siteItem.GameID,
        "HA": {},
        "1X2": {},
        "OU": {},
    };
    siteItem.Odds.forEach((oddItem: IWSOdds) => {
        if (oddItem.PlayMode.includes("OU")) {
            siteData['OU'] = getWSOU(oddItem)
        } else if (oddItem.PlayMode.includes("HA")) {
            const { HA, X } = getWSHA(oddItem);
            siteData['HA'] = HA
            siteData['1X2'] = X
        }
    });
    return siteData
}

const getWSOU = (ou: IWSOdds) => {
    const ouData: IOdd = {};
    ou.Prices.forEach((priceItem: IWSPrices) => {
        if (priceItem.Main) {
            ouData['spread'] = `o${priceItem.Spread}`
            priceItem.Odds.forEach((oddItem: IWSOddInfo) => {
                if (oddItem.OddType == "O") {
                    ouData['o'] = oddItem.Odd
                } else if (oddItem.OddType == "U") {
                    ouData['u'] = oddItem.Odd
                }
            });
        }
    });
    return ouData;
}

const getWSHA = (ha: IWSOdds) => {
    const haData: IDict<IOdd> = { HA: {}, X: {} };
    ha.Prices.forEach((priceItem: IWSPrices) => {
        if (priceItem.Main) {
            if (priceItem.Spread == "1X2") {
                haData["X"]["spread"] = priceItem.Spread
                priceItem.Odds.forEach((oddItem: IWSOddInfo) => {
                    if (oddItem.OddType == "1") {
                        haData["X"]['h'] = oddItem.Odd
                    } else if (oddItem.OddType == "2") {
                        haData["X"]['a'] = oddItem.Odd
                    }
                });
            } else {
                haData["HA"]["spread"] = priceItem.Spread
                priceItem.Odds.forEach((oddItem: IWSOddInfo) => {
                    if (oddItem.OddType == "1") {
                        haData["HA"]['h'] = oddItem.Odd
                    } else if (oddItem.OddType == "2") {
                        haData["HA"]['a'] = oddItem.Odd
                    }
                });
            }
        }
    });
    return haData;
}