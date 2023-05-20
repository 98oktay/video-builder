import staticState from "./state";


type TransitionProps = {
  effect?: string;
  duration?: number;
}

const Transition = ({ effect = "TricolorCircle", duration = 2 }: TransitionProps) => {

  const { scenes } = staticState;
  const scene = scenes[scenes.length - 1];
  if (!scenes.length) {
    throw new Error("Transition component must be after of Scene component!");
  }

  scene.setTransition(effect, duration);
  return null;
}
export default Transition;