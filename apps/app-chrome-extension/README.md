# GrafMesh Chrome Extension

The Chrome Extension allows users to create and manage annotations directly on any webpage.

---

## Features

- Add annotations with `Shift + Double Click`.
- Synchronize annotations across devices using IPFS.
- Customize styles and positions of annotations.

---

## Development Setup

1. Install dependencies:

   ```bash
   yarn
   ```

2. Build the extension:

   ```bash
   yarn build
   ```

3. Load the extension:
   - Open `chrome://extensions/`.
   - Enable **Developer Mode**.
   - Click **Load Unpacked** and select the `dist/` folder.

---

## Usage

- Open any webpage and use the shortcut (`Shift + Double Click`) to add annotations.
- Customize annotations via the popup menu.
