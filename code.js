figma.showUI(__html__);

figma.ui.resize(240, 600);

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
      await figma.clientStorage.setAsync('postItsEndpoint', msg.postItsEndpoint);
      
      // Notify UI of success and close
      figma.notify('Settings saved successfully');
    } else if (msg.type === 'load-settings') {
      // Load settings from Figma's client storage
      const serviceUrl = await figma.clientStorage.getAsync('serviceUrl') || '';
      const apiKey = await figma.clientStorage.getAsync('apiKey') || '';
      const postItsEndpoint = await figma.clientStorage.getAsync('postItsEndpoint') || '';
      
      // Send settings back to the UI
      figma.ui.postMessage({
        type: 'settings-loaded',
        serviceUrl,
        apiKey,
        postItsEndpoint
      });
    } else if (msg.type === 'create-post-its') {
      try {
        // Load the settings
        const serviceUrl = await figma.clientStorage.getAsync('serviceUrl');
        const apiKey = await figma.clientStorage.getAsync('apiKey');
        const postItsEndpoint = await figma.clientStorage.getAsync('postItsEndpoint');
        
        if (!serviceUrl || !postItsEndpoint) {
          throw new Error('Service URL and Post-its endpoint must be configured in settings');
        }

        // Make the API call
        const headers = {
          'Content-Type': 'application/json'
        };
        if (apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`;
        }

        const response = await fetch(`${serviceUrl}${postItsEndpoint}`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ transcription: msg.transcription })
        });

        if (!response.ok) {
          throw new Error(`API call failed: ${response.statusText}`);
        }

        const notes = await response.json();
        
        // Create sticky notes for each item in the response
        const createdStickies = [];
        const center = figma.viewport.center;
        const spacing = 200; // pixels between sticky notes
        
        for (let i = 0; i < notes.length; i++) {
          const sticky = figma.createSticky();
          
          // Position stickies in a grid-like pattern
          const row = Math.floor(i / 3);
          const col = i % 3;
          sticky.x = center.x + (col - 1) * spacing;
          sticky.y = center.y + row * spacing;
          
          // Set sticky note properties
          sticky.fills = [{type: 'SOLID', color: {r: 1, g: 0.83, b: 0.23}}]; // Yellow color
          
          // Set the text
          await figma.loadFontAsync(sticky.text.fontName);
          sticky.text.characters = notes[i];
          
          createdStickies.push(sticky);
        }
        
        // Select all created sticky notes
        figma.currentPage.selection = createdStickies;
        
        // Zoom to fit all created sticky notes
        figma.viewport.scrollAndZoomIntoView(createdStickies);
        
        figma.notify(`Created ${notes.length} sticky notes`);
      } catch (error) {
        console.error('Error creating post-its:', error);
        figma.notify(`Error: ${error.message}`, { error: true });
      }
    }
  } catch (error) {
    console.error('Error in plugin:', error);
    figma.notify(`Error: ${error.message}`, { error: true });
    figma.closePlugin();
  }
}
