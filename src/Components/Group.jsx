import React from "react";
import staticState from "../staticState";
import { makeAnimation, makePosition } from "../utils";
const { FFText, FFRect } = require("ffcreator");

class FFGroup {
  constructor(bounds, parent) {
    this.childs = [];
    this.bounds = { ...bounds }
    this.parent = parent
  }

  addChild(child) {
    this.childs.push(child);
  }

  setBounds(bounds) {
    this.bounds = bounds;
  }

  getBounds() {
    return this.bounds;
  }

}

const GroupClose = (props) => {
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

const Group = (props) => {

  const { currentScene, groups } = staticState;

  if (!currentScene) {
    throw new Error("Group:'" + props.children + "' must be inside a Scene");
  }

  const position = makePosition(props);
  const width = props?.width || 1;
  const height = props?.height || 20;


  const group = new FFGroup({
    x: position.x - width / 2,
    y: position.y - height / 2,
    width,
    height,
  }, staticState.previousGroup);


  if (currentScene.outline) {
    const outline = new FFRect({
      width,
      height,
      ...position,
      color: 'red',
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