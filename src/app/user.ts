export class User {
  private token: string| null;
  private address: string| null;
  private playerName: string| null;

  constructor(token: string| null, address: string| null, playerName: string| null) {
    this.token = token;
    this.address = address;
    this.playerName = playerName;
  }

  getToken(): string| null {
    return this.token;
  }
  getAddress(): string| null {
    return this.address;
  }
  getPlayerName(): string| null {
    return this.playerName;
  }
  detPlayerName(playerName: string| null): void {
    this.playerName = playerName;
  }
}