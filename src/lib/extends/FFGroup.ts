

class FFGroup {

  childs: any[];
  bounds: any;
  parent: any;
  font: any;
  id?: string;
  listOptions: any;


  constructor(bounds, parent, id) {
    this.id = id;
    this.childs = [];
    this.bounds = { ...bounds }
    this.parent = parent;
    this.font = parent?.font;
    this.listOptions = {}
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

  setFont(font) {
    this.font = font;
  }

  setListOptions(options) {
    this.listOptions = options;
  }
}


export default FFGroup;