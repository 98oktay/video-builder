import staticState from "./state";
import colors from "colors";
import path from "path";

const Renderer = () => {

  const { creator, fileName, options, scenes, preview } = staticState;


  if(staticState.preview) {

    staticState.creator.setFps(1);
    staticState.preview.setDuration(1);

    preview.children.forEach(child => {
      child.animations.destroy();
    });

    scenes.forEach(scene => {
      if(scene !== staticState.preview){
        creator.removeChild(scene)
      }

    });
  }


  creator.output(path.join(__dirname, `../../${options.outputDir}/${fileName}.mp4`));

  creator.start();
  creator.closeLog();     // Close log (including perf)

  creator.on('start', () => {
    console.log(`Render start`);
  });
  creator.on('error', e => {
    console.log(`Render error: ${JSON.stringify(e)}`);
  });
  creator.on('progress', e => {
    console.log(colors.yellow(`Render progress: ${(e.percent * 100) >> 0}%`));
  });
  creator.on('complete', e => {
    console.log(colors.magenta(`Render completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
  });




  return null;
}


export default Renderer;