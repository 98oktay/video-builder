import staticState from "./state";

export const makeAnimation = (elem, props) => {
  if (props.in) {
    elem.addEffect(...props.in);
  }
  if (props.out) {
    elem.addEffect(...props.out);
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





  return pos;
}