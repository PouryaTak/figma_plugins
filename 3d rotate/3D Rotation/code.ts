// @ts-nocheck
const selected_objects = figma.currentPage.selection;
function runPlugin() {
  console.log(selected_objects);

  // figma.closePlugin(`plugin closed`);
}

runPlugin();