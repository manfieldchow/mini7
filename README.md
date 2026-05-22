# MiniBeam Pixel — MakeCode extension

6×7 WS2812B RGB LED matrix extension for the [BBC micro:bit](https://microbit.org/).

- **Size:** 6 columns (x: 0–5) × 7 rows (y: 0–6) — 42 LEDs  
- **Protocol:** WS2812B (NeoPixel), GRB order (standard)  
- **Dependency:** [Microsoft ws2812b](https://github.com/microsoft/pxt-ws2812b) (loaded automatically)

## Simulator

Use **connect MiniBeam on pin P0** first, then other blocks. The simulator may show a 6×7 LED grid (NeoPixel `parts` support). For zigzag PCB wiring on real hardware, use **set pixel x y**.

**Download** to a real micro:bit for full testing.

## Hardware

1. Connect matrix **DIN** to a micro:bit pin (default **P0** in blocks).  
2. Connect **GND** to micro:bit GND.  
3. Power the matrix from a suitable **5 V** supply (not from the micro:bit 3 V pin for full brightness).  
4. Use a **330 Ω** resistor in series on the data line if your board does not include one.

> Use an external 5 V supply for many LEDs; tie GND common with the micro:bit.

## Install in MakeCode

**Important:** use version **0.8.0** with tag `v0.8.0`. See [INSTALL.md](INSTALL.md).

1. Open [makecode.microbit.org](https://makecode.microbit.org).  
2. **Extensions** → paste your GitHub URL.  
3. Remove old extension, hard-refresh (Ctrl+Shift+R), add again.  
4. Add: `https://github.com/manfieldchow/mini3#v0.8.0`
5. Open toolbox category **minibeam**.

### Local test (same machine)

1. In MakeCode: **Extensions** → **Import URL** → your `pxt-minibeampixel` folder URL,  
   or develop via **GitHub** integration ([extension guide](https://makecode.com/extensions/getting-started)).  
2. Create a test project; your extension should appear with a **Local** label.

## Quick start

```blocks
minibeampixel.connect(DigitalPin.P0)
minibeampixel.showColor(MiniBeamColor.Blue)
```

```blocks
minibeampixel.connect(DigitalPin.P0)
minibeampixel.plotPixel(2, 3, 255)
minibeampixel.updateLeds()
```

## Wiring layout

LED strips on PCBs are often **row-major zigzag** (even rows left→right, odd rows right→left), starting at the **top-left**. That is the default.

If pixels appear scrambled:

1. Run **show test pattern** — LEDs light in chain order 0…41.  
2. Change **set wiring origin** / **set wiring layout** until `(x, y)` matches your PCB.

| Layout | Description |
|--------|-------------|
| rows, zigzag (default) | Serpentine by row |
| rows, straight | Each row same direction |
| columns, zigzag | Serpentine by column |
| columns, straight | Each column same direction |

## Blocks overview

| Block | Description |
|-------|-------------|
| connect on pin | Create 42-LED strip on chosen pin |
| set wiring origin / layout | Match physical LED order |
| set pixel x y to | Set one LED (RGB) |
| plot x y brightness | Plot with plot color |
| show image | 6×7 grid editor |
| show | Push buffer to LEDs |
| clear | Buffer off (then show) |
| show color | Fill and display |
| set brightness | 0–255 |
| show test pattern | Debug wiring |
| show bar graph | Column-style graph |

## Example: heart

```blocks
minibeampixel.connect(DigitalPin.P0)
minibeampixel.setPlotColor(MiniBeamColor.Red)
minibeampixel.setPixel(2, 3, MiniBeamColor.Red)
minibeampixel.updateLeds()
```

## Repository name

For MakeCode GitHub integration, naming the repo `pxt-minibeampixel` is recommended.

---

> This extension was generated for the MiniBeam Pixel hardware.  
> for PXT/microbit
