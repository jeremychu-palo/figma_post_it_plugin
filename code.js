figma.showUI(__html__);

figma.ui.resize(240, 200);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-shape') {
    console.log('Received text from UI:', msg.text);
    
    const sticky = figma.createSticky();
    // Position the sticky note in the center of the viewport
    const center = figma.viewport.center;
    sticky.x = center.x;
    sticky.y = center.y;
    
    // Set properties for the sticky note
    sticky.fills = [{type: 'SOLID', color: {r: 1, g: 0.8, b: 0.3}}]; // Yellow color
    // Create a text sublayer for the sticky note
    await figma.loadFontAsync(sticky.text.fontName)
    // textLayer.characters = msg.text;
    // textLayer.fontSize = 16;
    // textLayer.textAlignHorizontal = "CENTER";
    // textLayer.textAlignVertical = "CENTER";
    sticky.text.characters = msg.text;
    console.log('Set sticky note text to:', msg.text);
    
    // Select the created sticky note
    figma.currentPage.selection = [sticky];
    
    // Zoom into the sticky note
    figma.viewport.scrollAndZoomIntoView([sticky]);
  }
};
