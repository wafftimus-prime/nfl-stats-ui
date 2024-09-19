import { BaseCollectionModel } from "../models";

export interface NflPlayerModel extends BaseCollectionModel {
  id: string;

  espnID?: string; //4240499",
  espnName?: string; //Jack Coco",
  sleeperBotID?: string; //8907",
  espnIDFull?: string; //4240499/jack-coco",
  fRefID?: string; //CocoJa00",
  weight?: string; //248",
  jerseyNum?: string; //49",
  cbsShortName?: string; //J. Coco",
  team?: string; //ARI",
  yahooPlayerID?: string; //34700",
  age?: string; //25",
  espnLink?: string; //http://www.espn.com/nfl/player/_/id/4240499/jack-coco",
  yahooLink?: string; //https://sports.yahoo.com/nfl/players/34700",
  bDay?: string; //10/9/1998",
  espnHeadshot?: string; //https://a.espncdn.com/i/headshots/nfl/players/full/4240499.png",
  isFreeAgent?: string; //True",
  rotoWirePlayerIDFull?: string; //jack-coco-16630",
  cbsLongName?: string; //Jack Coco",
  injury?: {
    injReturnDate?: string; //",
    description?: string; //",
    injDate?: string; //",
    designation?: string; //"
  },
  teamID?: string; //1",
  pos?: string; // LS",
  school?: string; //Georgia Tech",
  cbsPlayerID?: string; //2838452",
  longName?: string; //Jack Coco",
  rotoWirePlayerID?: string; //16630",
  height?: string; //6'2\"",
  cbsPlayerIDFull?: string; //2838452/jack-coco",
  lastGamePlayed?: string; //20221016_NYJ@GB",
  playerID?: string; //4240499",
  exp?: string; //2",
}


