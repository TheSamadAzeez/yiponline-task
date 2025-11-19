# Storekeeper App - HNG13 Stage 2 Mobile Track

A fully functional inventory management mobile application built with React Native and Expo that helps users manage their product inventory locally using SQLite database.

## 🔗 Quick Links

| Resource                 | Link                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 📱 **APK**               | [View APK](https://appetize.io/app/b_33xbvxuicgla7bw75zrewtb2qq)                                            |
| 🎬 **Demo Video**        | [Watch on Google Drive](https://drive.google.com/file/d/1wuGqo7TUORnjfkauEWi3FaHs83R09m7P/view?usp=sharing) |
| 💻 **GitHub Repository** | [View Source Code](https://github.com/TheSamadAzeez/hng13-stage2-mobile)                                    |

## 📱 Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete products
- ✅ **Local SQLite Database**: Persistent data storage using Expo SQLite
- ✅ **Camera Integration**: Capture product images using device camera
- ✅ **Gallery Picker**: Select product images from device gallery
- ✅ **Search Functionality**: Search products by name in real-time
- ✅ **Product Details**: View comprehensive product information
- ✅ **Edit Products**: Update product information including image, name, quantity, and price
- ✅ **Delete Confirmation**: Safe deletion with confirmation modal
- ✅ **Empty State**: User-friendly empty state when no products exist
- ✅ **Pull to Refresh**: Refresh product list with pull-down gesture
- ✅ **Responsive UI**: Clean and modern interface following Material Design principles
- ✅ **Dark Mode Ready**: Theme support for light and dark modes

## 🎯 Product Information

Each product includes:

- Product Name
- Quantity (in units)
- Price (per unit)
- Product Image (optional)
- Created At timestamp
- Last Updated timestamp

## 🛠️ Technologies Used

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router 6
- **Database**: Expo SQLite 16
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Language**: TypeScript
- **Image Handling**: Expo Image Picker, Expo File System
- **Icons**: @expo/vector-icons (Ionicons, MaterialIcons)

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Expo Go app on your mobile device (for testing)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/TheSamadAzeez/hng13-stage2-mobile.git
   cd hng13-stage2-mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm start
   # or
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android)
   - Scan the QR code with Camera app (iOS)

## 🎥 Demo & Downloads

### � Download APK

Download the release APK to install and test the app on your Android device:

**[Download Storekeeper App APK](YOUR_APK_LINK_HERE)**

> **Note**: You may need to enable "Install from Unknown Sources" in your Android settings to install the APK.

### �📹 Demo Video

Watch the full app walkthrough and features demonstration (2-4 minutes):

**[🎬 Watch Demo Video on Google Drive](YOUR_GOOGLE_DRIVE_VIDEO_LINK_HERE)**

_The video demonstrates:_

- Adding new products with camera/gallery integration
- Viewing product list and real-time search
- Editing product details and updating images
- Deleting products with confirmation dialog
- Complete CRUD operations flow
- User interface and navigation

### 🔗 GitHub Repository

**Public Repository**: [https://github.com/TheSamadAzeez/hng13-stage2-mobile](https://github.com/TheSamadAzeez/hng13-stage2-mobile)

> The repository contains complete source code, configuration files, and this README.

## 📂 Project Structure

```
hng13-stage2-mobile/
├── app/                      # App screens and navigation
│   ├── _layout.tsx          # Root layout with Stack navigator
│   ├── index.tsx            # Product list screen (Home)
│   ├── add-product.tsx      # Add new product screen
│   └── details.tsx          # Product details screen
├── services/                 # Business logic and data management
│   └── database.ts          # SQLite database service with CRUD operations
├── components/              # Reusable UI components
├── assets/                  # Images, icons, and static files
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # TailwindCSS configuration
└── README.md               # This file
```

## 🎨 Screens

### 1. Product List Screen (Home)

- Displays all products in a scrollable list
- Search bar to filter products by name
- Empty state when no products exist
- Floating action button to add new products
- Pull-to-refresh functionality

### 2. Add Product Screen

- Form to input product details
- Image picker with camera and gallery options
- Validation for all fields
- Save button to create new product

### 3. Product Details Screen

- Full product information display
- Product image (or placeholder)
- Edit button to modify product
- Delete button with confirmation modal

### 4. Edit Product Modal

- Full-screen modal for editing
- Pre-filled form with existing data
- Image update option
- Save changes button

## 🗄️ Database Schema

```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  imageUri TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### App Configuration (app.json)

The app is configured with proper Android and iOS settings including:

- Permissions for camera and media library
- SQLite plugin configuration
- App icons and splash screens
- Build settings

### Required Permissions

- Camera access (for taking product photos)
- Photo library access (for selecting existing images)

## 🧪 Testing

To test the app:

1. **Add Products**: Test creating products with and without images
2. **View Products**: Verify product list displays correctly
3. **Search**: Test search functionality with various terms
4. **Edit Products**: Update product information and verify changes
5. **Delete Products**: Test deletion with confirmation modal
6. **Image Handling**: Test both camera and gallery image selection
7. **Validation**: Test form validation with invalid inputs

## 📦 Building APK

To build a production APK:

### Using EAS Build (Recommended)

1. **Install EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**

   ```bash
   eas login
   ```

3. **Configure and build**

   ```bash
   eas build --platform android --profile preview
   ```

4. Download the APK from the link provided after the build completes

### Using Expo Build Service (Alternative)

```bash
npx expo build:android -t apk
```

The APK will be available for download from your Expo dashboard.

## 📝 Task Requirements Checklist

- ✅ Fully functional app with local database CRUD implementation
- ✅ Ability to add, view, edit, and delete products
- ✅ Native camera integration for adding product images
- ✅ Clean, responsive UI suitable for store management
- ✅ SQLite database (not local storage like Hive/SharedPreferences)
- ✅ Product name, quantity, price, and optional image fields
- ✅ GitHub Repository with complete source code
- ✅ Demo Video (2-4 minutes)
- ✅ README with APK link and all relevant information

## 👨‍💻 Developer - Azeez Samad

## 💪 Slack ID - @Redox

- HNG Internship - Mobile Track
- Stage 2 Task Submission

## 📄 License

This project is part of the HNG Internship program.

## 🙏 Acknowledgments

- HNG Internship Team
- Expo Team for excellent documentation
- React Native Community

---

**Submission Date**: October 29, 2025

**Task**: Mobile Track Stage 2 - Storekeeper App

**Contact**: azeezsamad2004@gmail.com
