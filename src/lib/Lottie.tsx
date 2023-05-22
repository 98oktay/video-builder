import { FFRect, AblendTypes, FFLottie } from "ffcreator";
import FFLine from "./extends/FFLine";
import staticState from "./state";
import { makeAnimation, makePosition, makeSize } from "./utils";

type LineProps = {
  x: number | string,
  y: number | string,
  width?: number | string,
  height?: number| string,
  scale?: number,
  radius?: number | number[],
  blend?: string,
  children?: any,
  file: string,
  relative?: [number, number],
  in?: any,
  out?: any,
}

const Lottie = (props: LineProps) => {
  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Lottie: must be inside a Scene");
  }

  const { width, height } = makeSize(props);

  const position = makePosition({
    ...props,
    width,
    height,
  });


  const box = new FFLottie({
    file: props.file,
    ...position,
    width,
    height,
  });

  if (props.blend) {
    box.addBlend(props.blend as AblendTypes);
  }

  makeAnimation(box, props);

  if (currentGroup) {
    currentGroup.addChild(box);
  }

  currentScene.addChild(box);

  if (currentScene.outline) {
    const outline = new FFRect({
      width,
      height,
      ...position,
      color: 'yellow',
      opacity: 0.5,
    });
    outline.setAnchor(0)
    makeAnimation(outline, props);
    currentScene.addChild(outline);
    if (currentGroup) {
      currentGroup.addChild(outline);
    }
  }

  return null;
}

export default Lottie;