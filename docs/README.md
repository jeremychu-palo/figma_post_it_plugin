# PALO FigJam Plugin

This project is a FigJam plugin that provides intelligent sticky note organization and management capabilities, enhancing collaboration and productivity within FigJam workspaces.

## Features

- Smart sticky note creation and management
- Customizable color-coding for different note categories
- Base64 encoding support for data handling
- Tab-based interface with Sticky Notes and Settings sections
- Automatic saving of transcripts and settings
- Responsive and user-friendly interface

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the plugin:
   ```bash
   npm run build
   ```
4. Import the plugin into Figma/FigJam following the [plugin development guide](https://www.figma.com/plugin-docs/plugin-quickstart-guide/)

## Usage

1. Open FigJam
2. Access the plugin through the plugins menu
3. Use the tab interface to switch between Sticky Notes and Settings
4. Create and manage sticky notes with automatic categorization
5. Customize settings according to your preferences

## Development

### Prerequisites
- Node.js (v14 or higher)
- Figma Desktop app
- Figma Plugin development environment

### Local Development
1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open FigJam and load the plugin in development mode

## Project Structure

The main project files include:

- `code.js`: Core plugin logic including message handling and sticky note management
- `ui.html`: Plugin UI implementation with tabs and responsive design
- `manifest.json`: Plugin configuration and metadata
- `docs/`: Documentation and project resources

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## Last Updated

December 17, 2024

## License

This project is proprietary and confidential. All rights reserved.
