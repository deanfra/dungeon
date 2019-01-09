import TILES from "./tiles.js";

export default class Room {
  constructor(width, height) {
    this.id = new Date().getTime() * Math.floor(((Math.random() * 1000) / Math.random()) * 10);
    this.width = width;
    this.height = height;

    this.setPosition(0, 0);

    this.doors = [];
    this.tiles = [];

    // Surround the room with walls, and fill the rest with floors.
    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        if (y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1) {
          row.push(TILES.WALL);
        } else {
          row.push(TILES.FLOOR);
        }
      }
      this.tiles.push(row);
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.left = x;
    this.right = x + (this.width - 1);
    this.top = y;
    this.bottom = y + (this.height - 1);
    this.centerX = x + Math.floor(this.width / 2);
    this.centerY = y + Math.floor(this.height / 2);
  }

  getDoorLocations() {
    var doors = [];

    // find all the doors and add their positions to the list
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (this.tiles[y][x] == TILES.DOOR) {
          doors.push({ x: x, y: y });
        }
      }
    }

    return doors;
  }

  overlaps(otherRoom) {
    if (this.right < otherRoom.left) return false;
    else if (this.left > otherRoom.right) return false;
    else if (this.bottom < otherRoom.top) return false;
    else if (this.top > otherRoom.bottom) return false;
    else return true;
  }

  isConnectedTo(otherRoom) {
    // checks the doors array and sees if other room links to any
    let doors = this.doors;
    for (let i = 0; i < doors.length; i++) {
      const linkIds = this.doors.map(door => door.linksTo);
      return linkIds.indexOf(otherRoom.id) >= 0;
    }

    return false;
  }
}
