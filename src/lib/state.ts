
type StateType = {
  creator?: any,
  fileName?: string,
  scenes: Array<any>,
  groups: Array<any>,
  currentGroup?: any,
  previousGroup?: any,
  currentScene?: any,
  options?: any,
  preview?: { [key: string] : any },
  slow?: boolean
}

const state: StateType = {
  scenes: [],
  groups: [],
}


export default state