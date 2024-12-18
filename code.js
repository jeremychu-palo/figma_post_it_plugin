figma.showUI(__html__);

figma.ui.resize(240, 500);

// Color mapping for different categories
const categoryColors = {
  key_features: { r: 1, g: 0.8, b: 0.8 },     // Light red
  desired_outcomes: { r: 0.8, g: 1, b: 0.8 },  // Light green
  technical_requirements: { r: 0.8, g: 0.8, b: 1 },  // Light blue
  target_users: { r: 1, g: 1, b: 0.8 }  // Light yellow
};

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
      sticky.fills = [{type: 'SOLID', color: {r: 0.8, g: 1, b: 0.8}}]; // Default light green color
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
    } else if (msg.type === 'create-post-its') {
      try {
        // Parse the JSON input
        const jsonInput = JSON.parse(msg.transcription);
        
        // Validate the JSON structure
        if (!Array.isArray(jsonInput) || !jsonInput[0] || !jsonInput[0].output) {
          throw new Error('Invalid JSON format. Expected array with format [{"output": {...}}]');
        }

        const output = jsonInput[0].output;
        
        // Get the total number of categories for spacing calculation
        const categories = Object.keys(output);
        const categoryCount = categories.length;
        const categorySpacing = 300; // Space between categories horizontally
        const noteSpacing = 250; // Increased vertical space between notes
        const noteHeight = 100; // Approximate height of a sticky note
        
        // Calculate the total width needed
        const totalWidth = categoryCount * categorySpacing;
        const startX = figma.viewport.center.x - (totalWidth / 2);
        
        // Process each category
        categories.forEach((category, categoryIndex) => {
          const notes = output[category];
          if (!Array.isArray(notes)) return;

          // Calculate the x position for this category
          const categoryX = startX + (categoryIndex * categorySpacing);
          
          // Create category label
          const categoryLabel = figma.createText();
          categoryLabel.x = categoryX;
          categoryLabel.y = figma.viewport.center.y - (notes.length * (noteHeight + noteSpacing) / 2) - 50; // Position above the sticky notes
          figma.loadFontAsync({ family: "Inter", style: "Bold" }).then(() => {
            categoryLabel.fontName = { family: "Inter", style: "Bold" };
            categoryLabel.fontSize = 24;
            // Convert category to title case and replace underscores with spaces
            const formattedCategory = category
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            categoryLabel.characters = formattedCategory;
          });

          // Calculate total height needed for this category
          const totalHeight = notes.length * (noteHeight + noteSpacing);
          const startY = figma.viewport.center.y - (totalHeight / 2);

          // Create sticky notes for each item in the category
          notes.forEach((note, noteIndex) => {
            if (!note.text && !note.title) {
              console.warn('Skipping note without text content');
              return;
            }

            const sticky = figma.createSticky();
            
            // Position notes vertically within their category with increased spacing
            sticky.x = categoryX;
            sticky.y = startY + (noteIndex * (noteHeight + noteSpacing));
            
            // Set color based on category
            const color = categoryColors[category] || categoryColors.desired_outcomes;
            sticky.fills = [{type: 'SOLID', color: color}];
            
            // Set the text
            figma.loadFontAsync(sticky.text.fontName).then(() => {
              sticky.text.characters = note.title ? `${note.title}\n\n${note.text}` : note.text;
            });
          });
        });

        figma.notify('Created sticky notes successfully');
      } catch (error) {
        console.error('Error creating post-its:', error);
        figma.notify(`Error: ${error.message}`, { error: true });
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
