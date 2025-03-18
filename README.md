# GrafMesh

GrafMesh is a revolutionary platform for creating, sharing, and managing annotations in a decentralized way. This project combines P2P technology, Web3, and modern web development tools to redefine digital collaboration.

---

## Features

- **Decentralized Network**: Use IPFS and GUN.js for distributed data storage and retrieval.
- **Annotations Everywhere**: Add annotations to any webpage and synchronize them across devices.
- **Web3 Integration**: Leverage blockchain for secure and transparent annotation management.

---

## Project Structure

```
.
├── apps/
│ ├── app-chrome-extension/ # Chrome Extension for annotation management
│ ├── app-ios/ # iOS Application (future development)
│ ├── app-android/ # Android Application (future development)
├── services/
│ ├── service-heroku/ # Backend services for managing annotations
│ ├── service-gun-peer/ # Peer-to-peer service using GUN.js
│ ├── service-ipfs/ # IPFS integration for decentralized storage
├── packages/
│ ├── cli/ # CLI tools for project management
│ ├── shared/ # Shared utilities and components
```

---

## Development Setup

### Prerequisites

- Node.js 16+
- Yarn (Corepack recommended)
- Docker (for backend services)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-repo>/graffmesh.git
   cd graffmesh
   ```

2. Install dependencies:

   ```bash
   yarn install

   ```

3. Start development servers:

   ```bash
   yarn dev
   ```

---

## Contributing

Contributions are welcome! Please follow the [contribution guide](./CONTRIBUTING.md).
