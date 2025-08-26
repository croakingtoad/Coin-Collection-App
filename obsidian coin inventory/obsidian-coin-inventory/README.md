# Obsidian Coin Collection Inventory Plugin

A comprehensive Obsidian plugin designed for numismatists and coin collectors to digitally catalog and manage their coin collections. This plugin leverages OCR (Optical Character Recognition) technology to automatically extract information from coin images and grading labels, making the cataloging process faster and more accurate.

## 🪙 Overview

The Coin Collection Inventory plugin transforms Obsidian into a powerful tool for coin collectors, offering automated data extraction, customizable organization, and seamless integration with your existing vault structure. Whether you're managing a small personal collection or a large investment portfolio, this plugin provides the tools you need to maintain detailed records of your coins.

## ✨ Features

### Core Functionality
- **📸 Image Upload & Processing**: Drag and drop or select images of coins and grading slabs
- **🤖 OCR Technology**: Powered by Tesseract.js for automatic text extraction from images
- **📱 Mobile Support**: Take photos directly from your mobile device's camera
- **🧠 Learning System**: The plugin learns from your corrections to improve future recognition accuracy
- **📝 Customizable Templates**: Define exactly how your coin notes are formatted
- **📊 Structured Data**: Store coin information in a consistent, searchable format

### Advanced Capabilities
- **Grading Label Recognition**: Automatically extracts information from PCGS, NGC, ANACS, and other grading company slabs
- **Mint Mark Detection**: Recognizes common mint marks (CC, O, S, D, P, etc.)
- **Variety Identification**: Supports VAM numbers and other variety designations
- **Batch Processing**: Process multiple coin images efficiently
- **Smart Filename Generation**: Automatically generate descriptive filenames based on coin attributes

## Installation

### From Obsidian

1. Open Obsidian
2. Go to Settings > Community Plugins
3. Disable Safe Mode if necessary
4. Click "Browse" and search for "Coin Inventory"
5. Install the plugin and enable it

### Manual Installation

1. Download the latest release from the GitHub repository
2. Extract the zip file into your Obsidian vault's `.obsidian/plugins/` directory
3. Reload Obsidian
4. Enable the plugin in Settings > Community Plugins

## Usage

### Adding a Coin

1. Click the coin icon in the left ribbon
2. Upload an image of your coin (drag and drop or select a file)
3. The plugin will process the image and extract information
4. Review and edit the extracted information
5. Click "Save Coin" to create a new note for the coin

### Mobile Usage

On mobile devices, you can:
1. Click the coin icon in the left ribbon
2. Tap "Select Image" to open your device's camera or photo gallery
3. Take a photo or select an existing image
4. Review and edit the extracted information
5. Tap "Save Coin" to create a new note

### Settings

The plugin settings allow you to customize:
- Data folder for storing coin notes and images
- Template for coin notes
- Default coin type and grade
- Learning system settings
- OCR language
- Filename template

## Template Variables

The following variables can be used in your note templates:

- `{{year}}` - Year of the coin
- `{{mintMark}}` - Mint mark (e.g., CC, O, S, D, P)
- `{{grade}}` - Grade of the coin
- `{{variety}}` - Variety designation (e.g., VAM number)
- `{{gradingCompany}}` - Company that graded the coin
- `{{serialNumber}}` - Serial number on the grading label
- `{{holderType}}` - Type of holder the coin is in
- `{{generation}}` - Generation of the holder
- `{{pedigree}}` - Pedigree or collection history
- `{{imagePath}}` - Path to the coin image
- `{{notes}}` - Additional notes about the coin
- `{{coinType}}` - Type of coin (e.g., Morgan Dollar)

## License

This plugin is licensed under the MIT License.

## Support

If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository. 