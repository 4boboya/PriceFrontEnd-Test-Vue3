import { IGameData, ILeague, IGame, IOdds, IOdd, ISiteOdds, IResApiLiveGame, ISiteGameDtos, ISitePrices, ISiteOddInfo, ITidyDataRes } from "@/type/Live"
import { IDict, IStringDict } from "@/type/Global"

const siteModel = {
  "bet365.com": {},
  "betfair.com": {},
  "bwin.com": {},
  "ku888": {},
  "twsl": {},
  "pinnacle.com": {},
}

export const tidyData = (liveDtos: Array<IResApiLiveGame>): ITidyDataRes => {
    const liveDatas = {} as IGameData
    let leagueMappintg = {} as IStringDict
    let gameMappintg = {} as IStringDict
    if (liveDtos == null || liveDtos.length <= 0) return { liveDatas: liveDatas, leagueMappintg: leagueMappintg, gameMappintg: gameMappintg}
    liveDtos.forEach((item: IResApiLiveGame) => {
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
        leagueMappintg = Object.assign(leagueMappintg, siteMergeLeagueMapping)
        gameMappintg = Object.assign(gameMappintg, siteMergeGameMapping)
        liveDatas[item.leagueID][item.gameID] = gameData
    });
    
    return { liveDatas: liveDatas, leagueMappintg: leagueMappintg, gameMappintg: gameMappintg}
}

const tidySite = (siteDtos: Array<ISiteGameDtos>, lid: string, gid: string) => {
    const siteData: IDict<IOdds> = JSON.parse(JSON.stringify(siteModel)) as IDict<IOdds>;
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
    const siteData = {
        "ID": siteItem.gameID,
        "HA": {},
        "1X2": {},
        "OU": {},
    } as IOdds;
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
    const ouData = {} as IOdd;
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
    const haData = { HA: {}, X: {} } as IDict<IOdd>;
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
