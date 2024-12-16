# PALO FigJam Plugin

This project is a FigJam plugin that utilizes AI to enhance user experience within FigJam, providing intelligent assistance and automation features for improved collaboration and productivity.

## Features

- AI-powered assistance for FigJam workflows
- Intelligent content organization and suggestions
- Enhanced collaboration capabilities
- Seamless integration with FigJam's native features

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
3. Follow the on-screen instructions to utilize AI-powered features

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

## Documentation

Detailed documentation for the AI-powered features and architecture can be found in the `docs/ai-powered` directory. This includes:

- `plugin-description.md`: Overview of the plugin and its features
- `architecture.md`: Technical architecture details
- `ai-powered.canvas`: Visual documentation in FigJam

## Project Structure

The project has the following structure:

- .gitignore
- code.js
- manifest.json
- ui.html
- docs/
- docs/ai-powered/
- docs/ai-powered/ai-powered.canvas
- docs/ai-powered/architecture.md
- docs/ai-powered/CHANGELOG.md
- docs/ai-powered/plugin-description.md
- docs/ai-powered/README.md
- docs/ai-powered/journals/
- docs/ai-powered/logseq/
- docs/ai-powered/logseq/config.edn
- docs/ai-powered/logseq/custom.css
- docs/ai-powered/logseq/bak/
- docs/ai-powered/logseq/bak/logseq/
- docs/ai-powered/logseq/bak/logseq/config/
- docs/ai-powered/logseq/bak/logseq/config/2024-12-12T05_46_40.766Z.Desktop.edn
- docs/ai-powered/logseq/bak/logseq/config/2024-12-12T05_59_25.303Z.Desktop.edn
- docs/ai-powered/logseq/bak/logseq/config/2024-12-12T05_59_26.102Z.Desktop.edn
- docs/ai-powered/logseq/bak/logseq/config/2024-12-12T05_59_27.507Z.Desktop.edn
- docs/ai-powered/pages/
- docs/ai-powered/pages/contents.md
- docs/ai-powered/whiteboards/
- docs/ai-powered/whiteboards/LogSeq.edn

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## Last Updated

December 16, 2024

## License

This project is proprietary and confidential. All rights reserved.
