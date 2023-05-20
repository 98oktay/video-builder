class FFGroup {
  constructor(bounds, parent) {
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


module.exports = FFGroup;
