// @ts-nocheck
function runPlugin() {
  let numebr_of_items = 0;
  const selected = figma.currentPage.selection;
  const styleList = figma.getLocalPaintStyles()

  if (selected.length === 0) {
    figma.closePlugin('Please select some valid objects');
  }
  for (let item of selected) {

    if (item.fillStyleId) {
      numebr_of_items++
      const styleName = styleList.filter(style => style.id === item.fillStyleId)[0].name
      const is_dark = styleName.includes('dark') ? 'dark' : 'light'

      const new_id = styleList.filter(style => style.name === styleName.replace(is_dark, is_dark === 'dark' ? 'light' : 'dark'))[0].id
      item.fillStyleId = new_id

    }
  }
 if (numebr_of_items === 0) {
    figma.closePlugin('Select objects with fill styles which has "dark" or "light" in its name');
  }
  figma.closePlugin(`${numebr_of_items} items have been updated`);
}

runPlugin();