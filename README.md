# Solana Superstage Airdrop

A Next.js application for gathering public keys and signing messages to verify users. This project features a QR code-based wallet connection system with Solflare integration.

## 🚀 Features

- QR code generation for wallet connection
- Solflare wallet integration
- Message signing functionality
- Responsive design
- Custom toast notifications
- Mobile-first approach
- Password-protected download page for wallet addresses

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- A Solana RPC endpoint (currently using QuickNode)

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/solana-superstage-airdrop.git
   cd solana-superstage-airdrop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment Variables:

   Create a `.env` file in the root directory and add the following environment variable:

   ```plaintext
   AUTH_PWD=your_secure_password
   ```

   Replace `your_secure_password` with a strong password of your choice.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔒 Security Recommendations


*The current setup uses a simple API call for password verification. For enhanced security, consider implementing a more robust authentication mechanism. You can do so by integrating with a third-party authentication provider like Auth0, NextAuth, or Firebase Authentication.*

## 📦 Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized build in the `out` directory.

## 🚀 Running in Production

To start the application in production mode, run:

```bash
npm start
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
