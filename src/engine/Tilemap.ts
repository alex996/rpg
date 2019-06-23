class Tilemap {
  public columns: number // width in columns
  public rows: number // height in rows

  public tileSize: number

  public visualGrid: { top: [number]; bottom: [number] }
  public logicGrid: [number]

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
    visualGrid: { top: [number]; bottom: [number] }
    logicGrid: [number]
  }) {
    this.columns = columns
    this.rows = rows
    this.tileSize = tileSize
    this.visualGrid = visualGrid
    this.logicGrid = logicGrid
  }

  public getTileIndex (column: number, row: number): number {
    return row * this.columns + column
  }
}

export default Tilemap
