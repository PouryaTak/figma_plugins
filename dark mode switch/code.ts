
function runPlugin(){

const selected = figma.currentPage.selection;
for(let item of selected){
  // @ts-ignore
  console.log(item);
  console.log(figma.parameters );
  

  // for(let key in item){
  //   console.log(`${key}: ${item[key]}`);
  // }
  
}
// console.log(selected);
// console.log('Hello from Figma!');

  // figma.closePlugin();
}

runPlugin();