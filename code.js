figma.showUI(__html__);

figma.ui.resize(240, 120);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-shape') {
    const shape = figma.createShapeWithText();
    // Position the shape in the center of the viewport
    const center = figma.viewport.center;
    shape.x = center.x;
    shape.y = center.y;
    
    // Set some basic properties
    shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    shape.text.characters = "Hello Figjam!";
    
    // Select the created shape
    figma.currentPage.selection = [shape];
    
    // Zoom into the shape
    figma.viewport.scrollAndZoomIntoView([shape]);
  }
};
