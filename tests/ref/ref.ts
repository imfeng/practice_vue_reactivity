const dep = new Set(); // Our object tracking a list of effects 觀察者列表

export const effect = (cb: Function) => {
  cb();
  // return new Promise((resolve) => {
  //   resolve(1);
  // });
};

export const track = () => {};
