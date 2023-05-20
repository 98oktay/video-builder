'use strict';
import { createCanvas, Sprite, Texture } from 'inkpaint';
import { FFNode } from 'ffcreator';

/**
 * FFLine - A color gradiented line component
 * ####Example:
 *   const line = new FFLine({ color: "#cc22ff", width: 400, height: 300,  points: [] });
 *   line.setColor("#00cc22");
 *   scene.addChild(line);
 *
 * @class
 */

type FFLineConfType = {
  rect?: string,
  border?: string | number | { width: number, color: string },
  width?: number,
  height?: number,
  poinst?: number[],
  radius?: number | number[],
  color?: string | string[],
  x: number,
  y: number,
};


class FFLine extends FFNode {
  canvas: any;
  display: any;
  color: any;
  border: any;
  points: number[];
  constructor(conf: FFLineConfType) {
    super({ type: 'line', ...conf } as any);
    const { color = '#044EC5' } = conf;
    this.color = color;
    this.border = conf.border;
    this.points = conf.poinst || [0, 0, 0, 0];

    this.setColor(color);
    this.setAnchor(0);
    this.makeRect();
  }

  /**
   * Functions for drawing images
   * @private
   */
  createDisplay() {
    const [width, height] = this.getWH();
    if (!this.canvas) this.canvas = createCanvas(width, height);
    this.display = new Sprite(Texture.fromCanvas(this.canvas));
    this.setAnchor(0.5);
    this.setDisplaySize();
  }

  /**
   * Functions for setDisplaySize
   * @private
   */
  setDisplaySize() {
    const { display } = this;
    const [width, height] = this.getWH();

    if (width && height) {
      display.width = width;
      display.height = height;
      display.setScaleToInit();
    }
  }

  /**
   * Set display object width and height
   * @param {number} width - object width
   * @param {number} height - object height
   * @public
   */
  setWH(width, height) {
    this.setSize(width, height);
    this.setDisplaySize();
  }

  /**
   * Set rect color value
   * @param {string} color - the rect color value
   * @public
   */
  setColor(color) {
    this.color = color;
  }

  makeRect() {
    let border = this.border || {
      width: 0,
      color: 'black',
    };
    if (typeof border === 'number') {
      border = {
        width: border,
        color: 'black',
      }
    }
    if (typeof border === 'string') {
      border = {
        width: 1,
        color: border,
      }
    }

    const lineWidth = border.width;

    const [x, y, x2, y2] = this.points;

    let leftDiff = x - x2 > 0 ? x - x2 : 0;
    let topDiff = y - y2 > 0 ? y - y2 : 0;

    const [width, height] = this.getWH();

    const ctx = this.canvas.getContext('2d');
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = border.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.lineCap = 'round';
    ctx.moveTo(lineWidth / 2 + leftDiff, lineWidth / 2 + topDiff);
    ctx.lineTo(x2 - x + lineWidth / 2 + leftDiff, y2 - y + lineWidth / 2 + topDiff);


    if (Array.isArray(this.color)) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      // Add three color stops
      const totalColor = this.color.length - 1;
      this.color.forEach((color, index) => {
        gradient.addColorStop(index / totalColor, color);
      });
      ctx.strokeStyle = gradient;

    } else {
      ctx.strokeStyle = this.color;
    }

    if (lineWidth) {
      ctx.stroke();
    }
  }

  destroy() {
    this.canvas = null;
    super.destory();
  }
}


export default FFLine;
