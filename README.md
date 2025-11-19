# Storekeeper App - YIPONLINE - TASK (case study)

A fully functional inventory management mobile application built with React Native and Expo that helps users manage their product inventory locally using persistent state management.

## 🔗 Quick Links

| Resource                 | Link                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 📱 **APK**               | [View APK](https://appetize.io/app/b_33xbvxuicgla7bw75zrewtb2qq)                                            |
| 🎬 **Demo Video**        | [Watch on Google Drive](https://drive.google.com/file/d/1wuGqo7TUORnjfkauEWi3FaHs83R09m7P/view?usp=sharing) |
| 💻 **GitHub Repository** | [View Source Code](https://github.com/TheSamadAzeez/yiponline-task)                                         |

## 📱 Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete products
- ✅ **State Management**: Centralized state management using Zustand
- ✅ **Camera Integration**: Capture product images using device camera
- ✅ **Gallery Picker**: Select product images from device gallery
- ✅ **Search Functionality**: Search products by name in real-time
- ✅ **Product Details**: View comprehensive product information
- ✅ **Edit Products**: Dedicated full-screen edit page for updating product information
- ✅ **Product Limit**: Maximum 5 products with visual counter and limit notifications
- ✅ **Product Limit Notification**: Modal alert when attempting to exceed product limit
- ✅ **Delete Confirmation**: Safe deletion with confirmation modal
- ✅ **Empty State**: User-friendly empty state when no products exist
- ✅ **Pull to Refresh**: Refresh product list with pull-down gesture
- ✅ **Responsive UI**: Clean and modern interface following Material Design principles
- ✅ **Visual Feedback**: Product counter badge showing current/maximum products

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
- **State Management**: Zustand (for global state and data management)
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
   git clone https://github.com/TheSamadAzeez/yiponline-task.git
   cd yiponline-task
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

## 🎥 Demo

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

**Public Repository**: [https://github.com/TheSamadAzeez/yiponline-task](https://github.com/TheSamadAzeez/yiponline-task)

> The repository contains complete source code, configuration files, and this README.

## 📂 Project Structure

```
yiponline-task/
├── app/                      # App screens and navigation
│   ├── _layout.tsx          # Root layout with Stack navigator
│   ├── index.tsx            # Product list screen (Home)
│   ├── add-product.tsx      # Add new product screen
│   ├── edit-product.tsx     # Edit product screen (full-screen)
│   └── details.tsx          # Product details screen
├── store/                    # State management
│   └── productStore.ts      # Zustand store for product state and CRUD operations
├── components/              # Reusable UI components
│   ├── ProductLimitNotification.tsx  # Product limit modal
│   └── ...                  # Other components
├── assets/                  # Images, icons, and static files
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # TailwindCSS configuration
└── README.md               # This file
```

## 🎨 Screens

### 1. Product List Screen (Home)

- Displays all products in a scrollable list
- Product counter badge showing current/maximum products (X/5 format)
- Search bar to filter products by name
- Empty state when no products exist
- Floating action button to add new products (disabled when limit reached)
- Pull-to-refresh functionality
- Product limit notification modal

### 2. Add Product Screen

- Form to input product details
- Image picker with camera and gallery options
- Validation for all fields
- Product limit check before saving
- Product limit notification modal when limit reached
- Save button to create new product

### 3. Product Details Screen

- Full product information display
- Product image (or placeholder)
- Edit button to navigate to edit screen
- Delete button with confirmation modal

### 4. Edit Product Screen

- Dedicated full-screen page for editing
- Pre-filled form with existing data
- Image update option with camera/gallery picker
- Form validation
- Save changes button
- Close button to cancel editing

### 5. Product Limit Notification Modal

- Clean modal design with icon and message
- Appears when attempting to add products beyond the 5-product limit
- Informative message about the product limit
- Dismissible with "Got it" button

## 🔧 Configuration

### App Configuration (app.json)

The app is configured with proper Android and iOS settings including:

- Permissions for camera and media library
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

- ✅ Fully functional app with state management and CRUD implementation
- ✅ Ability to add, view, edit, and delete products
- ✅ Native camera integration for adding product images
- ✅ Clean, responsive UI suitable for store management
- ✅ Zustand state management for centralized data handling
- ✅ Product name, quantity, price, and optional image fields
- ✅ GitHub Repository with complete source code
- ✅ Demo Video (2-4 minutes)
- ✅ README with all relevant information

## 👨‍💻 Developer - Azeez Samad

- Yiponline Task Submission

## 🙏 Acknowledgments

- Yiponline Team
- Expo Team for excellent documentation
- React Native Community

---

**Submission Date**: October 19, 2025

**Task**: Yiponline Case Study

**Contact**: azeezsamad2004@gmail.com
