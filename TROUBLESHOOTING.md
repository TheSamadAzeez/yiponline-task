# 🔧 Troubleshooting Guide

Common issues and their solutions for the Storekeeper App.

## 🚨 Installation Issues

### Issue: `pnpm install` fails

**Solutions:**

````bash
# Clear npm cache
pnpm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install


### Issue: Expo CLI not found

**Solution:**

```bash
pnpm install -g expo-cli
````

## 📱 Running the App

### Issue: QR code doesn't work

**Solutions:**

1. Make sure phone and computer are on same WiFi
2. Try tunnel mode: `npx expo start --tunnel`
3. Use direct URL: Type the URL shown in terminal into Expo Go

### Issue: Metro bundler errors

**Solution:**

```bash
# Clear cache and restart
npx expo start -c

# Or restart with clean slate
rm -rf .expo
npx expo start -c
```

### Issue: "Unable to resolve module"

**Solution:**

```bash
# Clear watchman cache (macOS)
watchman watch-del-all

# Clear Metro cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*

# Restart
npx expo start -c
```

## 🗄️ Database Issues

### Issue: Database not initializing

**Solution:**

```bash
# Make sure expo-sqlite is installed
npx expo install expo-sqlite

# Prebuild the app
npx expo prebuild

# Restart
npx expo start -c
```

### Issue: "Cannot find database file"

**Solution:**

- The database is created automatically on first use
- Make sure `initDatabase()` is called in the app
- Check device storage permissions

### Issue: Data not persisting

**Solution:**

- SQLite data persists by default
- Don't uninstall/reinstall app during testing
- Check that you're not in development mode cache

### Issue: SQL errors

**Solution:**

- Check SQL syntax in `services/database.ts`
- Verify column names match the schema
- Check for proper string escaping in queries

## 📷 Camera/Image Issues

### Issue: Camera permission denied

**Solutions:**

1. **Android**: Settings → Apps → Your App → Permissions → Enable Camera
2. **iOS**: Settings → Privacy → Camera → Enable for your app
3. Uninstall and reinstall the app to trigger permission prompt again

### Issue: Gallery permission denied

**Solutions:**

1. **Android**: Settings → Apps → Your App → Permissions → Enable Storage/Photos
2. **iOS**: Settings → Privacy → Photos → Enable for your app

### Issue: Images not displaying

**Solutions:**

```typescript
// Make sure image URI is correct
console.log('Image URI:', imageUri);

// For local files, ensure it starts with 'file://'
if (imageUri && !imageUri.startsWith('file://')) {
  imageUri = 'file://' + imageUri;
}
```

### Issue: "Image picker not working"

**Solution:**

```bash
# Reinstall image picker
npx expo install expo-image-picker

# Rebuild
npx expo prebuild
npx expo start -c
```

## 🏗️ Build Issues

### Issue: EAS build fails

**Solutions:**

```bash
# Make sure you're logged in
eas login

# Check project configuration
eas build:configure

# Try building again
eas build --platform android --profile preview --clear-cache
```

### Issue: "No such file or directory" during build

**Solution:**

```bash
# Make sure all files are committed
git add .
git commit -m "fix: add missing files"
git push

# Then rebuild
eas build --platform android --profile preview
```

### Issue: Android build taking too long

**Solution:**

- EAS builds can take 10-30 minutes
- Check build status: `eas build:list`
- Monitor in dashboard: https://expo.dev/accounts/[your-account]/projects/[project]/builds

### Issue: Local Android build fails

**Solution:**

```bash
# Make sure Java is installed
java -version

# Make sure Android SDK is set up
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleRelease
```

## 🎨 UI/Style Issues

### Issue: Tailwind classes not working

**Solution:**

```bash
# Make sure NativeWind is installed
pnpm install nativewind

# Check tailwind.config.js exists
# Check babel.config.js has nativewind plugin

# Restart with cache clear
npx expo start -c
```

### Issue: Dark mode not working

**Solution:**

- Dark mode classes (dark:) work automatically
- Test by changing device theme settings
- Make sure `userInterfaceStyle` in app.json is set to "automatic"

### Issue: Icons not displaying

**Solution:**

```bash
# Make sure vector icons are installed
npx expo install @expo/vector-icons

# Check import
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
```

## ⚠️ Runtime Errors

### Issue: "undefined is not an object"

**Solution:**

- Check that product data exists before accessing properties
- Use optional chaining: `product?.name`
- Add null checks: `if (product) { ... }`

### Issue: "Cannot read property of undefined"

**Solution:**

```typescript
// Always check if data exists
const product = await getProductById(id);
if (!product) {
  Alert.alert('Error', 'Product not found');
  return;
}
```

### Issue: App crashes on navigation

**Solution:**

```bash
# Clear cache
npx expo start -c

# Check navigation URLs are correct
router.push('/screen-name')

# Not: router.push('screen-name') // Missing /
```

## 🔍 Search Issues

### Issue: Search not working

**Solution:**

```typescript
// Check search query handling
const handleSearch = async (text: string) => {
  if (text.trim() === '') {
    // Show all products
    setFilteredProducts(products);
  } else {
    // Search
    const results = await searchProducts(text);
    setFilteredProducts(results);
  }
};
```

### Issue: Search too slow

**Solution:**

- Add debouncing to search input
- Optimize database query with indexes
- Limit search results

## 🐛 Form Validation Issues

### Issue: Validation not working

**Solution:**

```typescript
// Check validation logic
if (!name.trim()) {
  Alert.alert('Error', 'Name is required');
  return;
}

if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
  Alert.alert('Error', 'Invalid quantity');
  return;
}
```

### Issue: Cannot enter decimals in price

**Solution:**

```tsx
// Use correct keyboard type
<TextInput
  keyboardType="decimal-pad" // Not "numeric"
  value={price}
  onChangeText={setPrice}
/>
```

## 📲 Testing Issues

### Issue: Expo Go shows "Something went wrong"

**Solution:**

```bash
# Check for syntax errors
npm run lint

# Clear cache
npx expo start -c

# Check the error message in terminal
```

### Issue: Can't test on physical device

**Solution:**

1. Make sure device and computer on same network
2. Try tunnel mode: `npx expo start --tunnel`
3. Or use connection type: `npx expo start --lan`

## 🔐 Permission Issues

### Issue: Permissions not requested

**Solution:**

```bash
# Check app.json has proper permissions
# For Android, check:
"permissions": [
  "android.permission.CAMERA",
  "android.permission.READ_EXTERNAL_STORAGE",
  "android.permission.WRITE_EXTERNAL_STORAGE"
]

# Rebuild with new permissions
npx expo prebuild --clean
```

## 📝 TypeScript Errors

### Issue: Type errors during build

**Solution:**

```bash
# Check types
npm run lint

# Fix common issues:
# - Import types: import { Product } from '../services/database';
# - Use correct types for parameters
# - Add type annotations where needed
```

### Issue: "Cannot find module '@/'"

**Solution:**

- Check `tsconfig.json` has proper path aliases
- Restart TypeScript server in VS Code: Cmd+Shift+P → "Restart TS Server"

## 🆘 Still Having Issues?

1. **Check the Expo documentation**: https://docs.expo.dev
2. **Check project files**: Review PROJECT_SUMMARY.md
3. **Search for the error**: Copy error message and search online
4. **Check console logs**: Look for detailed error messages
5. **Try a clean rebuild**:
   ```bash
   rm -rf node_modules .expo
   npm install
   npx expo start -c
   ```

## 💡 Pro Tips

- Always test on a physical device before building APK
- Keep Metro bundler terminal open to see errors
- Use console.log() liberally for debugging
- Check device logs for native errors (adb logcat)
- Test each feature after implementing
- Commit code frequently

---

If none of these solutions work, create a GitHub issue with:

- The exact error message
- Steps to reproduce
- Your environment (OS, Node version, etc.)
- Screenshots if applicable
