figma.showUI(__html__);

figma.ui.resize(240, 400);

figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'create-shape') {
      console.log('Received text from UI:', msg.text);
      
      const sticky = figma.createSticky();
      // Position the sticky note in the center of the viewport
      const center = figma.viewport.center;
      sticky.x = center.x;
      sticky.y = center.y;
      
      // Set properties for the sticky note
      sticky.fills = [{type: 'SOLID', color: {r: 0.8, g: 1, b: 0.8}}]; // Light green color
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
    } else if (msg.type === 'save-settings') {
      // Save settings using Figma's client storage
      await figma.clientStorage.setAsync('serviceUrl', msg.serviceUrl);
      await figma.clientStorage.setAsync('apiKey', msg.apiKey);
      
      // Notify UI of success and close
      figma.notify('Settings saved successfully');
    } else if (msg.type === 'load-settings') {
      // Load settings from Figma's client storage
      const serviceUrl = await figma.clientStorage.getAsync('serviceUrl') || '';
      const apiKey = await figma.clientStorage.getAsync('apiKey') || '';
      
      // Send settings back to the UI
      figma.ui.postMessage({
        type: 'settings-loaded',
        serviceUrl,
        apiKey
      });
    }
  } catch (error) {
    console.error('Error in plugin:', error);
    figma.notify(`Error: ${error.message}`, { error: true });
    figma.closePlugin();
  }
}
