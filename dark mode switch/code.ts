// @ts-nocheck
let numebr_of_modified_items = 0;
const selected_objects = figma.currentPage.selection;
const color_styleList = figma.getLocalPaintStyles()
const effect_styleList = figma.getLocalEffectStyles()
let changed = false

function runPlugin() {
  console.log(effect_styleList);
  
  if (selected_objects.length === 0) {
    figma.closePlugin('Please select some valid objects');
  }
  for (let item of selected_objects) {

    changeId(item)

    if (item.children && item.children.length > 0) {
      for (let child of item.children) {
        changeId(child)
      }
    }

    if (changed) {
      numebr_of_modified_items++
      changed = false
    }
  }
  if (numebr_of_modified_items === 0) {
    figma.closePlugin('Select objects with fill styles which has "dark" or "light" in its name');
  }
  figma.closePlugin(`${numebr_of_modified_items} items have been updated`);
}

function changeId(selected) {

  if (selected.fillStyleId) {

    changed = true
    selected.fillStyleId = retunNewId(selected.fillStyleId, color_styleList )

  } if (selected.effectStyleId) {

    changed = true
    selected.effectStyleId = retunNewId(selected.effectStyleId, effect_styleList)

  } if (selected.strokeStyleId) {
    console.log('bingo');

    changed = true
    selected.strokeStyleId = retunNewId(selected.strokeStyleId, color_styleList )

  }
}


function retunNewId(id, list) {
  const styleName = list.filter(style => style.id === id)[0].name 
  console.log(styleName);
  
  const is_dark = styleName.includes('dark') ? 'dark' : 'light'
  return list.filter(style => style.name === styleName.replace(is_dark, is_dark === 'dark' ? 'light' : 'dark'))[0].id
}


runPlugin();