export class shortUrl {
  full: string;
  short: string;
  clicks: number;
  created: Date;
  lastVisit: Date;
  constructor(
  pFull: string,
  pShort: string,
  pClicks: number,
  pCreated: Date,
  pLastVisit: Date
  ) {
   this.full = pFull,
   this.short = pShort,
   this.clicks = pClicks,
   this.created = pCreated,
   this.lastVisit = pLastVisit
  }
}
