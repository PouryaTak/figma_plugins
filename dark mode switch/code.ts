// @ts-nocheck
let numebr_of_items = 0;
const selected = figma.currentPage.selection;
const styleList = figma.getLocalPaintStyles()
let changed = false

function runPlugin() {
  console.log(selected);

  if (selected.length === 0) {
    figma.closePlugin('Please select some valid objects');
  }
  for (let item of selected) {

    changeId(item)

    if (item.children && item.children.length > 0) {
      for (let child of item.children) {
        changeId(child)
      }
    }

    if (changed) {
      numebr_of_items++
      changed = false
    }
  }
  if (numebr_of_items === 0) {
    figma.closePlugin('Select objects with fill styles which has "dark" or "light" in its name');
  }
  figma.closePlugin(`${numebr_of_items} items have been updated`);
}

function changeId(selected) {
  if (selected.fillStyleId) {
    changed = true
    const styleName = styleList.filter(style => style.id === selected.fillStyleId)[0].name
    const is_dark = styleName.includes('dark') ? 'dark' : 'light'

    const new_id = styleList.filter(style => style.name === styleName.replace(is_dark, is_dark === 'dark' ? 'light' : 'dark'))[0].id
    selected.fillStyleId = new_id

  }
  if (selected.effectStyleId) {
    changed = true
    const styleName = styleList.filter(style => style.id === selected.effectStyleId)[0].name
    const is_dark = styleName.includes('dark') ? 'dark' : 'light'

    const new_id = styleList.filter(style => style.name === styleName.replace(is_dark, is_dark === 'dark' ? 'light' : 'dark'))[0].id
    selected.effectStyleId = new_id

  }
  if (selected.strokeStyleId) {

    changed = true
    const styleName = styleList.filter(style => style.id === selected.strokeStyleId)[0].name
    const is_dark = styleName.includes('dark') ? 'dark' : 'light'

    const new_id = styleList.filter(style => style.name === styleName.replace(is_dark, is_dark === 'dark' ? 'light' : 'dark'))[0].id
    selected.strokeStyleId = new_id

  }
}


runPlugin();