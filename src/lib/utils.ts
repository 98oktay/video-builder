import sharp from "sharp";
import md5 from "md5";
import path from 'path';
import fs from 'fs'
import fetch from 'sync-fetch';
import staticState from "./state";

export const makeAnimation = (elem, props) => {
  if (props.in) {
    elem.addEffect(...props.in);
  }
  if (props.out) {
    elem.addEffect(...props.out);
  }
  if (props.animation) {
    loopAnimation(elem, props.animation);
  }
}


function loopAnimation(obj, conf) {
  const {loop = 1, yoyo, ...animation} = conf;

  for (let l = 0; l < loop; l++) {
      const newOptions = {
          ...animation,
          delay: (animation.delay || 0) + (l * animation.time),
      }
      if (yoyo && l % 2) {
          newOptions.from = {...animation.to};
          newOptions.to = {...animation.from};
      }
      obj.addAnimate({...newOptions});
  }
}


export const loadFromNetwork = (props) => {

  let imagePath;
  let imageData: Buffer | null = null;
  const hash = md5(JSON.stringify(props));
  const filename = props.url.split("/").pop().split(".")[0] + hash;
  imagePath = path.join(__dirname, './../../.tmp/', `./${filename}.png`);
  if (!fs.existsSync(imagePath)) {
    imageData = fetch(props.url).buffer() as Buffer;
    fs.promises.writeFile(imagePath, imageData, { encoding: null })
  }

  return {
    path: imagePath,
    data: imageData,
    filename,
    hash,
  };
}


export const makeBorder = (props, imagePath, imageData, dimensions  ) => {
  const { width, height } = dimensions;
  let radius = props.radius || [0, 0];
  if (typeof radius === 'number') {
    radius = [radius, radius];
  }
  if (typeof radius === 'string') {
    radius = radius.split(" ").map(r => parseInt(r));
  }

  let border = props.border || {
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



  const hash = md5(JSON.stringify(props));
  const filename = (props.src || props.url).split("/").pop().split(".")[0] + hash + "-rounded";
  const newImagePath = path.join(__dirname, './../../.tmp/', `./${filename}.png`);
  if(fs.existsSync(newImagePath)){
    return { path: newImagePath }
  }

  const sizes = `width="${width}" height="${height}"`;
  const sizesRadius = `${sizes} rx="${radius[0]}" ry="${radius[1]}"`;
  const roundedCorners = Buffer.from(`<svg ${sizes}><rect x="0" y="0" ${sizesRadius} /></svg>`);
  const stroke = Buffer.from(
    `<svg ${sizes}>
        <rect x="0" y="0" fill="none" ${sizesRadius} stroke="${border.color}" stroke-width="${border.width}"/>      
    </svg>`
  );
  const input = imageData || fs.readFileSync(imagePath);
  

  const png = sharp(input)
    .resize(width, height)
    .composite([
      { input: stroke },
      { input: roundedCorners, blend: 'dest-in' },
    ])
    .png();
  png.toFile(newImagePath);


  return { path: newImagePath }
}

export const makeSize = (props) => {
  let { width, height, aspectRatio } = props;
  const { currentScene, currentGroup, options } = staticState;


  if (width === undefined) {
    width = props.height * aspectRatio
  }

  if (height === undefined) {
    height = props.width / aspectRatio
  }


  // scene bounds
  let bounds = {
    width: options.width,
    height: options.height,
    x: 0,
    y: 0,
  }
  if (currentGroup) {
    bounds = {
      ...currentGroup.getBounds()
    };
  }

  if (typeof width === "string") {
    if (width.indexOf('%') > -1) {
      width = bounds.width * (parseInt(width) / 100);
    }
  }

  if (typeof height === "string") {
    if (height.indexOf('%') > -1) {
      height = bounds.height * (parseInt(height) / 100);
    }
  }

  return {
    width,
    height,
  }
}


export const resetGroupIndex = () => {
  const { currentGroup } = staticState;
  if (currentGroup?.listOptions) {
    console.log("resetGroupIndex", staticState.currentGroup.id);
    //staticState.currentGroup.listOptions.nextPositionY = 0;

  }
}


export const makePosition = (props) => {
  const { currentScene, currentGroup, options } = staticState;

  const width = props.width || 0;
  const height = props.height || 20;

  const { x, y } = props;

  // scene bounds
  let bounds = {
    width: options.width,
    height: options.height,
    x: 0,
    y: 0,
  }
  if (currentGroup) {
    bounds = {
      ...currentGroup.getBounds()
    };
  }

  const pos = {
    x: x === null || x === undefined ? "center" : x,
    y: y === null || y === undefined ? "center" : y,
  }

  if (currentGroup?.listOptions) {
    const { type, itemSpacing, nextPositionY,itemReset, itemHeight } = currentGroup.listOptions;
    if (type === "vertical") {
      pos.y = "top";
      if (nextPositionY && itemSpacing) {
        bounds.y += itemSpacing;
      }
      bounds.y += nextPositionY;
      currentGroup.listOptions.nextPositionY += (itemHeight || height);
      currentGroup.listOptions.itemCount++;
      if(itemReset === currentGroup.listOptions.itemCount) {
        currentGroup.listOptions.nextPositionY = 0;
        currentGroup.listOptions.itemCount = 0;
      }
    }


  }


  if (typeof pos.x === 'string') {
    if (pos.x === 'center') {
      pos.x = bounds.x + (bounds.width / 2);
    } else if (pos.x === 'left') {
      pos.x = bounds.x + (width / 2);
    } else if (pos.x === 'right') {
      pos.x = bounds.x + bounds.width - (width / 2)
    } else if (pos.x.indexOf('%') > -1) {
      const percent = parseInt(pos.x) / 100;
      pos.x = bounds.x + (width / 2) + ((bounds.width - (width)) * percent);
    }
  } else {
    pos.x = bounds.x + (width / 2) + parseInt(pos.x);
  }


  if (typeof pos.y === 'string') {
    if (pos.y === 'center') {
      pos.y = bounds.y + (bounds.height / 2);
    } else if (pos.y === 'top') {
      pos.y = bounds.y + (height / 2);
    } else if (pos.y === 'bottom') {
      pos.y = bounds.y + bounds.height - (height / 2);
    } else if (pos.y.indexOf('%') > -1) {
      const percent = parseInt(pos.y) / 100;
      pos.y = bounds.y + (height / 2) + ((bounds.height - (height)) * percent);
    }
  } else {
    pos.y = bounds.y + (height / 2) + parseInt(pos.y);
  }

  if (props.relative) {
    pos.x += props.relative[1];
    pos.y += props.relative[0];
  }




  return pos;
}