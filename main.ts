enum MiniBeamColor {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

/**
 * MiniBeam 6x7 WS2812B matrix.
 */
//% weight=88 color=#E81C24 icon="\uf110"
namespace minibeam {
    let ledPin = DigitalPin.P0
    let ledBuf: Buffer = null
    let ledBright = 128
    let penColor = MiniBeamColor.Red

    function indexAt(x: number, y: number): number {
        x = x >> 0
        y = y >> 0
        if (x < 0 || x > 5 || y < 0 || y > 6) {
            return -1
        }
        let col = x
        const row = y
        if (row % 2 == 1) {
            col = 5 - col
        }
        return row * 6 + col
    }

    function writeLed(i: number, rgb: number) {
        if (i < 0 || i >= 42 || ledBuf == null) {
            return
        }
        const o = i * 3
        let r = (rgb >> 16) & 0xff
        let g = (rgb >> 8) & 0xff
        let b = rgb & 0xff
        if (ledBright < 255) {
            r = (r * ledBright) >> 8
            g = (g * ledBright) >> 8
            b = (b * ledBright) >> 8
        }
        ledBuf[o + 0] = g
        ledBuf[o + 1] = r
        ledBuf[o + 2] = b
    }

    function ok(): boolean {
        return ledBuf != null
    }

    /**
     * Connect the matrix data line to a pin.
     */
    //% blockId=minibeam_connect
    //% block="connect on pin %pin"
    //% pin.defl=DigitalPin.P0
    //% weight=100
    //% blockGap=16
    export function connect(pin: DigitalPin) {
        ledPin = pin
        ledBuf = pins.createBuffer(126)
        pins.digitalWritePin(ledPin, 0)
    }

    /**
     * Set drawing colour for pixel blocks.
     */
    //% blockId=minibeam_pen
    //% block="set pen %value"
    //% weight=90
    //% blockGap=16
    export function setPen(value: MiniBeamColor) {
        penColor = value
    }

    /**
     * Set one pixel in the buffer.
     */
    //% blockId=minibeam_pixel
    //% block="set pixel x %x y %y to %value"
    //% x.min=0 x.max=5
    //% y.min=0 y.max=6
    //% weight=80
    //% blockGap=16
    export function setPixel(x: number, y: number, value: MiniBeamColor) {
        if (!ok()) {
            return
        }
        const i = indexAt(x, y)
        writeLed(i, value)
    }

    /**
     * Update the physical LEDs.
     */
    //% blockId=minibeam_update
    //% block="update LEDs"
    //% weight=70
    //% blockGap=16
    export function updateLeds() {
        if (!ok()) {
            return
        }
        ws2812b.sendBuffer(ledBuf, ledPin)
    }

    /**
     * Clear the buffer.
     */
    //% blockId=minibeam_clear
    //% block="clear buffer2"
    //% weight=60
    //% blockGap=16
    export function clearBuffer() {
        if (!ok()) {
            return
        }
        ledBuf.fill(0)
    }

    /**
     * Fill all pixels and update.
     */
    //% blockId=minibeam_all
    //% block="fill all %value"
    //% weight=50
    //% blockGap=16
    export function fillAll(value: MiniBeamColor) {
        if (!ok()) {
            return
        }
        let n = 0
        while (n < 42) {
            writeLed(n, value)
            n += 1
        }
        updateLeds()
    }
}
