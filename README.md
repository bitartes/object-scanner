# Object Scanner

A React Native mobile application that uses your device's camera and OpenAI's Vision API to identify objects in real-time.

## Features

- 📸 Real-time camera integration
- 🤖 AI-powered object recognition using OpenAI's Vision API
- 🔄 Support for both front and back cameras
- ✨ Modern, intuitive UI
- 🚀 Built with Expo and React Native

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [OpenAI API Key](https://platform.openai.com/api-keys)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/object-scanner.git
cd object-scanner
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

## Running the App

1. Start the development server:

```bash
npx expo start
```

2. Scan the QR code with:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

## Usage

1. Launch the app
2. Grant camera permissions if prompted
3. Point your camera at an object
4. Tap the scan button
5. Wait for the AI to identify the object
6. Tap "New Scan" to scan another object

## Tech Stack

- React Native
- Expo
- TypeScript
- OpenAI Vision API
- expo-camera
- expo-linear-gradient
- @expo/vector-icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the Vision API
- Expo team for the amazing development platform
- React Native community for the excellent documentation
