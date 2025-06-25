# Malazan Interactive Globe

A WebGL-powered interactive globe showcasing the world of the Malazan Book of the Fallen series. This project serves as a sandbox for experimenting with 3D globe visualization using Three.js and custom GLSL shaders.

## Features

- **Interactive 3D Globe**: Textured sphere with the Malazan world map
- **Atmospheric Effects**: Custom shader-based atmosphere rendering with glow effects
- **Mouse Interaction**: Globe rotation follows mouse movement
- **Auto-rotation**: Continuous spinning animation
- **Custom Shaders**: GLSL vertex and fragment shaders for realistic lighting and atmosphere

## Technical Stack

- **Three.js** - 3D graphics library
- **WebGL/GLSL** - Custom shaders for rendering effects
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript modules

## Project Structure

```
├── src/
│   └── main.js              # Main application entry point
├── shaders/
│   ├── vertex.glsl          # Main globe vertex shader
│   ├── fragment.glsl        # Main globe fragment shader
│   ├── atmosphereVertex.glsl # Atmosphere vertex shader
│   └── atmosphereFragment.glsl # Atmosphere fragment shader
├── img/
│   └── malazan.png          # Malazan world map texture
└── index.html               # HTML entry point
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

### Building

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Shaders Overview

### Main Globe Shaders
- **[vertex.glsl](shaders/vertex.glsl)** - Handles vertex positioning and UV mapping
- **[fragment.glsl](shaders/fragment.glsl)** - Applies texture and atmospheric lighting effects

### Atmosphere Shaders
- **[atmosphereVertex.glsl](shaders/atmosphereVertex.glsl)** - Vertex processing for atmosphere effect
- **[atmosphereFragment.glsl](shaders/atmosphereFragment.glsl)** - Creates the blue atmospheric glow

## Interaction

- **Mouse Movement**: Move your mouse to rotate the globe horizontally
- **Auto-rotation**: The globe continuously rotates on its Y-axis

## Future Enhancements

This sandbox provides a foundation for more advanced features:
- Interactive map markers for locations from the books
- Zooming and panning controls
- Multiple texture layers (political boundaries, terrain, etc.)
- Timeline-based map changes throughout the series
- Character journey paths
- 3D terrain elevation

## License

This project is for educational and experimental purposes.

## Acknowledgments

- **Steven Erikson** - Creator of the Malazan Book of the Fallen series
- **Three.js Community** - For the excellent 3D graphics library