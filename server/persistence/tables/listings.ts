import {BaseDatabase} from '../basedatabase';


export class Listings {
  constructor(private db: BaseDatabase) {}
  private static dataKeys = 'name, player1, player2, player3, player4, player5';


  private static getListingsQuery = `SELECT ${Listings.dataKeys} FROM listings`;
  public getListings(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.all(
          Listings.getListingsQuery, {},
          function(err: Error|null, rows: {[k: string]: string}[]) {
            console.log(rows);
            if (err !== null) {
              reject(err);
            } else {
              resolve(rows.toString());
            }
          });

    });
  }
  private static defaultListingName = 'New Game';
  private static createListingsQuery =
      'INSERT INTO listings(name) VALUES($name)';
  public createListing(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.run(
          Listings.createListingsQuery, {
            $name: Listings.defaultListingName,
          },
          function(err: Error|null) {
            if (err !== null) {
              reject(err);
            } else {
              resolve(this.lastID.toString());
            }
          });
    });
  }

  private findOpenOfFive(row: {[key: string]: string}): string|false {
    const possibilities =
        ['player1', 'player2', 'player3', 'player4', 'player5'];
    const open = possibilities.filter((player) => {
      return row[player] == undefined;
    });
    if (open.length >= 1) {
      return open[0];
    } else {
      return false;
    }
  }

  private static getListingQuery =
      `SELECT ${Listings.dataKeys} FROM listings WHERE rowid=$rowid`;
  public addUser(gameId: string, userId: string): Promise<void> {
    console.log('3');

    return new Promise((resolve, reject) => {
      console.log('4', gameId);

      this.db.get(
          Listings.getListingQuery, {
            $rowid: gameId,
          },
          (err: Error | null, row: {[key: string]: string}) => {
            console.log('5');

            if (err !== null) {
              reject(err);
            } else if (row['name'] != undefined) {
              console.log('6');

              // Game exists
              const open = this.findOpenOfFive(row);
              if (open) {
                console.log('66', open, userId, gameId);
                this.db.run(
                    'UPDATE listings SET ' + open + '=$p WHERE rowid=$rowid', {
                      $p: userId,
                      $rowid: gameId,
                    },
                    function(err: Error|null) {
                      console.log('8', err);
                      if (err !== null) {
                        reject(err);
                      } else {
                        resolve();
                      }
                    })
              }
            } else {
              console.log('7');

              reject();
            }
          });
    });
  }
}