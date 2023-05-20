'use strict';

const { FFNode } = require('ffcreator');
/**
 * FFBox - A color gradiented rectangle component
 *
 * ####Example:
 *
 *    const box = new FFBox({ color: "#cc22ff", width: 400, height: 300 });
 *    box.setColor("#00cc22");
 *    scene.addChild(box);
 *
 * @class
 */

const { createCanvas, Sprite, Texture } = require('inkpaint');

type FFBoxConfType = {
  rect?: string,
  border?: string | { width: number, color: string },
  width?: number,
  height?: number,
  radius?: number | number[],
  color?: string | string[],
  x: number,
  y: number,
};

class FFBox extends FFNode {
  constructor(conf: FFBoxConfType) {
    super({ type: 'box', ...conf });
    const { color = '#044EC5' } = this.conf;
    this.setColor(color);
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
    let border = this.conf.border || {
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
    const halfBorder = Math.ceil(lineWidth / 2);

    const [width, height] = this.getWH();
    const ctx = this.canvas.getContext('2d');
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = border.color;
    ctx.fillStyle = this.color;
    const radius = this.conf.radius || 0;
    ctx.beginPath();
    ctx.roundRect(halfBorder, halfBorder, width - halfBorder * 2, height - halfBorder * 2, radius);

    if (lineWidth) {
      ctx.stroke();
    }


    if (Array.isArray(this.color)) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      // Add three color stops
      const totalColor = this.color.length - 1;
      this.color.forEach((color, index) => {
        gradient.addColorStop(index / totalColor, color);
      });
      ctx.fillStyle = gradient;

    } else {
      ctx.fillStyle = this.color;
    }

    ctx.beginPath();
    ctx.roundRect(halfBorder * 2, halfBorder * 2, width - halfBorder * 4, height - halfBorder * 4, radius - halfBorder);
    ctx.fill();



  }

  destroy() {
    this.canvas = null;
    super.destroy();
  }
}


export default FFBox;
