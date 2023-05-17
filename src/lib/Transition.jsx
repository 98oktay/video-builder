import staticState from "./state";

const Transition = ({ effect = "TricolorCircle", duration = 2 }) => {

  const { scenes } = staticState;
  const scene = scenes[scenes.length - 1];
  if(!scenes.length) {
    throw new Error("Transition component must be after of Scene component!");
  }

  scene.setTransition(effect, duration);
  return null;
}
export default Transition;