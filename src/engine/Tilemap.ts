interface VisualGrid {
  top: [number]
  middle: [number]
  bottom: [number]
}

interface LogicGrid {
  [key: string]: boolean
}

class Tilemap {
  public columns: number // width in columns
  public rows: number // height in rows

  public tileSize: number

  public visualGrid: VisualGrid
  public logicGrid: LogicGrid

  private static TILE_SIZE = 32

  public constructor ({
    columns,
    rows,
    tileSize = Tilemap.TILE_SIZE,
    visualGrid,
    logicGrid
  }: {
    columns: number
    rows: number
    tileSize: number
    visualGrid: VisualGrid
    logicGrid: [number]
  }) {
    this.columns = columns
    this.rows = rows
    this.tileSize = tileSize
    this.visualGrid = visualGrid
    // Covert array to hash table for faster lookup
    this.logicGrid = logicGrid.reduce(
      (grid, number): object => ({ ...grid, [number]: true }),
      {}
    )
  }

  public getTileIndex (column: number, row: number): number {
    return row * this.columns + column
  }
}

export default Tilemap
