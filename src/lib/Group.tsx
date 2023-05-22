import React from "react";
import staticState from "./state";
import { makeAnimation, makePosition, makeSize } from "./utils";
import { FFRect } from "ffcreator";
import FFGroup from "./extends/FFGroup";

export type GroupProps = {
  x?: string | number,
  y?: string | number,
  width?: string | number,
  height?: string | number,
  id?: string,
  font?: string,
  list?: string,
  itemHeight?: number | string,
  itemWidth?: number | string,
  itemSpacing?: number | string,
  itemReset?: number,
  relative?: [number, number],
  children?: any,
  in?: any,
  out?: any,
}

const GroupClose = (props: GroupProps) => {
  const { currentGroup, previousGroup } = staticState;
  staticState.currentGroup = previousGroup;
  staticState.previousGroup = currentGroup.parent

  // group anims


  const loopItems = (items) => {
    items.map(child => {
      if (child instanceof FFGroup) {
        loopItems(child.childs);
      } else {
        makeAnimation(child, props);
      }
    });
  }


  if (props.in || props.out) {
    loopItems(currentGroup.childs)
  }

  return null;
}

const Group = (props: GroupProps) => {

  const { currentScene, groups } = staticState;

  if (!currentScene) {
    throw new Error("Group:'" + props.children + "' must be inside a Scene");
  }

  const position = makePosition(props);
  const { width, height } = makeSize(props);


  const group = new FFGroup({
    x: position.x - width / 2,
    y: position.y - height / 2,
    width,
    height,
  }, staticState.previousGroup, props.id);

  if (props.font) {
    group.setFont(props.font);
  } else if (staticState.currentGroup?.font) {
    group.setFont(staticState.currentGroup?.font);
  } else if (staticState.options?.font) {
    group.setFont(staticState.options?.font);
  }


  if (props.list) {

    const listOptions = {
      type: props.list,
      itemHeight: props.itemHeight,
      itemWidth: props.itemWidth,
      itemSpacing: props.itemSpacing,
      itemReset: props.itemReset,
      itemCount: 0,
      nextPositionY: 0
    }

    group.setListOptions(listOptions);
  }


  if (currentScene.outline) {
    const outline = new FFRect({
      width,
      height,
      ...position,
      color: 'green',
      opacity: 0.5,
    });

    currentScene.addChild(outline);
    group.addChild(outline);
  }

  groups.push(group);

  if (staticState.currentGroup) {
    staticState.previousGroup = staticState.currentGroup;
    staticState.previousGroup.childs.push(group);
  }
  staticState.currentGroup = group;

  return <>
    {props.children}
    <GroupClose {...props} />
  </>;
}

export default Group;