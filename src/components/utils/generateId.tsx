let id = 0
function generateElementUniqueID() {
  return `el-${id++}-`;
}

export default generateElementUniqueID;
