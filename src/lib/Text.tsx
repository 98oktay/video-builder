import { type } from "os";
import staticState from "./state";
import { makeAnimation, makePosition } from "./utils";
const { FFText, FFRect } = require("ffcreator");


type TextProps = {
  x?: string | number,
  y?: string | number,
  width?: number,
  height?: number,
  size?: null | number,
  center?: boolean,
  rotate?: number,
  color?: string,
  font?: string,
  wrap?: string,
  relative?: [number, number],
  children?: any,
  style?: any,
  in?: any,
  out?: any,
}


const Text = (props: TextProps) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Text:'" + props.children + "' must be inside a Scene");
  }

  const position = makePosition({
    ...props,
    width: props.width || 10,
    height: props.height || props.size || 20,
  });

  const text = new FFText({
    text: props.children,
    color: props.color || '#333333',
    ...position,
    fontSize: props.size || 20,
    rotate: props.rotate ? (props.rotate * Math.PI) / 180 : 0,
  });

  if (currentGroup?.font) {
    text.setFont(currentGroup.font);
  }

  if (props.style) {
    const styles = {
      ...props.style
    }

    if (props.size) {      
      styles.fontSize = props.size;      
    }
    
    if (props.style.font) {
      text.setFont(props.style.font);
    }
    
    text.setStyle(styles);
  }

  if (props.font) {
    text.setFont(props.font);
  }


  if (props.wrap && props.wrap !== 'none') {
    text.setWrap(parseInt(props.wrap));
  }

  if (props.center !== false) {
    text.alignCenter();
  }


  makeAnimation(text, props);

  if (currentScene.outline) {
    const outline = new FFRect({
      width: props.width || 10,
      height: props.height || props.size || 20,
      ...position,
      color: 'red',
      opacity: 0.5,
    });
    makeAnimation(outline, props);
    currentScene.addChild(outline);
    if (currentGroup) {
      currentGroup.addChild(outline);
    }
  }

  if (currentGroup) {

    const bounds = currentGroup.getBounds();
    if (bounds.width && !props.wrap) {
      text.setWrap(bounds.width);
    }
    currentGroup.addChild(text);
  }

  if (props.width && props.wrap !== 'none') {
    text.setWrap(props.width);
  }


  currentScene.addChild(text);

  return null;
}

export default Text;