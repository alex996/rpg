# Physics

## `TileMap`

> The outer rectangle is the full map, the inner one is the canvas.

```
-----------------------------------
|(x,y)                            |
| |    (playerX, playerY)         |
| ↓_____|________                 |
| |     ↓__      |                |
| |     |__|     | ← canvasHeight |
| |______________|                |
|       ↑                height → |
|  canvasWidth                    |
|                                 |
|            width                |
|              ↓                  |
-----------------------------------
```

- `width` and `height` are dimensions of the full map
- `canvasWidth` and `canvasHeight` are dimensions of the canvas
  - obviously, we can't draw the entire map image at once because it won't fit
  - thus, we need to crop out a snapshot the size of the available space (i.e. `canvasWidth/Height`)
- `x` and `y` are **top-left** coordinates in the map image that the snapshot will be cropped from
- `playerX` and `playerY` are absolute **center** coordinates of the player rectangle relative to the map

## `Player`

> The outer rectangle is the canvas, the inner one is the player.

```
--------------------------------------
|              (canvasX, canvasY)    |
|               ↓___                 |
|        (x, y) → . |← height        |
|               |___|                |
| canvasWidth     ↑   canvasHeight → |
|      ↓        width                |
--------------------------------------
```

- `x` and `y` are absolute **center** coordinates of the player rectangle in the full map
- `width` and `height` are dimensions of the player rectangle
- `canvasWidth` and `canvasHeight` are dimensions of the canvas
- `canvasX` and `canvasY` are **top-left** coordinates of the player in the canvas
  - canvas coordinates are top-to-bottom and left-to-right
  - `canvasWidth / 2` and `canvasHeight / 2` are indeed the center of the canvas
  - however, to make the player rectangle centered, we subtract `width / 2` and `height / 2`
