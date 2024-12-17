figma.showUI(__html__);

figma.ui.resize(240, 600);

// Base64 encoding function
function base64Encode(str) {
  const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    const char1 = str.charCodeAt(i++);
    const char2 = i < str.length ? str.charCodeAt(i++) : NaN;
    const char3 = i < str.length ? str.charCodeAt(i++) : NaN;

    const enc1 = char1 >> 2;
    const enc2 = ((char1 & 3) << 4) | (char2 >> 4);
    const enc3 = ((char2 & 15) << 2) | (char3 >> 6);
    const enc4 = char3 & 63;

    result += base64chars.charAt(enc1) +
              base64chars.charAt(enc2) +
              (isNaN(char2) ? '=' : base64chars.charAt(enc3)) +
              (isNaN(char3) ? '=' : base64chars.charAt(enc4));
  }
  
  return result;
}

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
      await figma.clientStorage.setAsync('username', msg.username);
      await figma.clientStorage.setAsync('password', msg.password);
      
      // Notify UI of success and close
      figma.notify('Settings saved successfully');
    } else if (msg.type === 'load-settings') {
      // Load settings from Figma's client storage
      const serviceUrl = await figma.clientStorage.getAsync('serviceUrl') || '';
      const apiKey = await figma.clientStorage.getAsync('apiKey') || '';
      const postItsEndpoint = await figma.clientStorage.getAsync('postItsEndpoint') || '';
      const username = await figma.clientStorage.getAsync('username') || '';
      const password = await figma.clientStorage.getAsync('password') || '';
      
      // Send settings back to the UI
      figma.ui.postMessage({
        type: 'settings-loaded',
        serviceUrl,
        apiKey,
        postItsEndpoint,
        username,
        password
      });
    } else if (msg.type === 'create-post-its') {
      try {
        // Parse the JSON input
        const jsonInput = JSON.parse(msg.transcription);
        
        // Validate the JSON structure
        if (!jsonInput.notes || !Array.isArray(jsonInput.notes)) {
          throw new Error('Invalid JSON format. Expected {"notes": [...]}');
        }

        // Create sticky notes for each item in the notes array
        for (const note of jsonInput.notes) {
          if (!note.text) {
            console.warn('Skipping note without text content');
            continue;
          }

          const sticky = figma.createSticky();
          const center = figma.viewport.center;
          
          // Add some random offset to prevent complete overlap
          sticky.x = center.x + (Math.random() - 0.5) * 200;
          sticky.y = center.y + (Math.random() - 0.5) * 200;
          
          sticky.fills = [{type: 'SOLID', color: {r: 0.8, g: 1, b: 0.8}}];
          await figma.loadFontAsync(sticky.text.fontName);
          sticky.text.characters = note.text;
        }

        figma.notify('Successfully created sticky notes!');
      } catch (error) {
        console.error('Error creating post-its:', error);
        figma.notify(`Error: ${error.message}`, { error: true });
        
        // Send error back to UI
        figma.ui.postMessage({
          type: 'error',
          message: error.message
        });
      }
    } else if (msg.type === 'save-transcript') {
      // Save transcript using Figma's client storage
      await figma.clientStorage.setAsync('transcript', msg.transcript);
      figma.notify('Transcript saved successfully');
    } else if (msg.type === 'load-transcript') {
      // Load transcript from Figma's client storage
      const transcript = await figma.clientStorage.getAsync('transcript') || '';
      
      // Send transcript back to the UI
      figma.ui.postMessage({
        type: 'transcript-loaded',
        transcript
      });
    }
  } catch (error) {
    console.error('Error in plugin:', error);
    figma.notify(`Error: ${error.message}`, { error: true });
    figma.closePlugin();
  }
}
