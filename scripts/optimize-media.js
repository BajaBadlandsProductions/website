#!/usr/bin/env node

/**
 * Media Optimization Script for Vercel Deployment
 * 
 * This script helps optimize images and videos for web delivery.
 * Run this before deploying to reduce file sizes and improve loading times.
 * 
 * Requirements:
 * - ffmpeg (for video compression)
 * - imagemagick (for image optimization)
 * 
 * Install on macOS:
 * brew install ffmpeg imagemagick
 * 
 * Usage:
 * node scripts/optimize-media.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Video optimization settings
const VIDEO_SETTINGS = {
  // High quality for hero videos (still compressed)
  high: '-c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart',
  // Medium quality for general use
  medium: '-c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k -movflags +faststart',
  // Low quality for slow connections
  low: '-c:v libx264 -crf 32 -preset fast -c:a aac -b:a 64k -movflags +faststart -vf scale=854:480'
};

// Image optimization settings
const IMAGE_SETTINGS = {
  jpeg: '-quality 85 -strip -interlace Plane',
  png: '-quality 85 -strip'
};

function checkDependencies() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    execSync('convert -version', { stdio: 'ignore' });
    console.log('✅ Dependencies found: ffmpeg and imagemagick');
    return true;
  } catch (error) {
    console.log('❌ Missing dependencies. Please install:');
    console.log('  macOS: brew install ffmpeg imagemagick');
    console.log('  Ubuntu: sudo apt install ffmpeg imagemagick');
    console.log('  Windows: Download from official websites');
    return false;
  }
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2); // MB
}

function optimizeVideo(inputPath, outputPath, quality = 'medium') {
  const settings = VIDEO_SETTINGS[quality];
  const originalSize = getFileSize(inputPath);
  
  console.log(`🎬 Optimizing video: ${path.basename(inputPath)} (${originalSize}MB)`);
  
  try {
    execSync(`ffmpeg -i "${inputPath}" ${settings} "${outputPath}" -y`, { stdio: 'ignore' });
    const newSize = getFileSize(outputPath);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    console.log(`   ✅ Compressed to ${newSize}MB (${savings}% smaller)`);
    return true;
  } catch (error) {
    console.log(`   ❌ Failed to optimize ${path.basename(inputPath)}`);
    return false;
  }
}

function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const settings = ext === '.jpg' || ext === '.jpeg' ? IMAGE_SETTINGS.jpeg : IMAGE_SETTINGS.png;
  const originalSize = getFileSize(inputPath);
  
  console.log(`🖼️  Optimizing image: ${path.basename(inputPath)} (${originalSize}MB)`);
  
  try {
    execSync(`convert "${inputPath}" ${settings} "${outputPath}"`, { stdio: 'ignore' });
    const newSize = getFileSize(outputPath);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    console.log(`   ✅ Compressed to ${newSize}MB (${savings}% smaller)`);
    return true;
  } catch (error) {
    console.log(`   ❌ Failed to optimize ${path.basename(inputPath)}`);
    return false;
  }
}

function processVideos() {
  if (!fs.existsSync(VIDEOS_DIR)) {
    console.log('📁 No videos directory found');
    return;
  }

  const videoFiles = fs.readdirSync(VIDEOS_DIR).filter(file => 
    file.endsWith('.mp4') && !file.includes('_optimized')
  );

  if (videoFiles.length === 0) {
    console.log('📁 No videos to optimize');
    return;
  }

  console.log(`\n🎬 Processing ${videoFiles.length} videos...`);

  videoFiles.forEach(file => {
    const inputPath = path.join(VIDEOS_DIR, file);
    const baseName = path.basename(file, '.mp4');
    const outputPath = path.join(VIDEOS_DIR, `${baseName}_optimized.mp4`);
    
    // Skip if already optimized
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${file} (already optimized)`);
      return;
    }

    // Determine quality based on file size
    const fileSize = parseFloat(getFileSize(inputPath));
    const quality = fileSize > 10 ? 'medium' : 'high';
    
    optimizeVideo(inputPath, outputPath, quality);
    
    // Create additional quality versions for progressive loading
    const lowPath = path.join(VIDEOS_DIR, `${baseName}_low.mp4`);
    if (!fs.existsSync(lowPath)) {
      optimizeVideo(inputPath, lowPath, 'low');
    }
  });
}

function processImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('📁 No images directory found');
    return;
  }

  const imageFiles = [];
  
  // Recursively find image files
  function findImages(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findImages(filePath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file) && !file.includes('_optimized')) {
        imageFiles.push(filePath);
      }
    });
  }
  
  findImages(IMAGES_DIR);

  if (imageFiles.length === 0) {
    console.log('📁 No images to optimize');
    return;
  }

  console.log(`\n🖼️  Processing ${imageFiles.length} images...`);

  imageFiles.forEach(inputPath => {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const baseName = path.basename(inputPath, ext);
    const outputPath = path.join(dir, `${baseName}_optimized${ext}`);
    
    // Skip if already optimized
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${path.basename(inputPath)} (already optimized)`);
      return;
    }

    // Only optimize large images (> 500KB)
    const fileSize = parseFloat(getFileSize(inputPath));
    if (fileSize > 0.5) {
      optimizeImage(inputPath, outputPath);
    } else {
      console.log(`⏭️  Skipping ${path.basename(inputPath)} (already small: ${fileSize}MB)`);
    }
  });
}

function generateOptimizationReport() {
  console.log('\n📊 Optimization Report:');
  console.log('='.repeat(50));
  
  // Check video sizes
  if (fs.existsSync(VIDEOS_DIR)) {
    const videos = fs.readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mp4'));
    videos.forEach(video => {
      const size = getFileSize(path.join(VIDEOS_DIR, video));
      const status = parseFloat(size) > 5 ? '⚠️  Large' : '✅ Good';
      console.log(`${status} ${video}: ${size}MB`);
    });
  }
  
  console.log('\n💡 Recommendations:');
  console.log('- Videos > 5MB should be hosted externally (YouTube/Vimeo)');
  console.log('- Consider using poster images for autoplay videos');
  console.log('- Use lazy loading for non-critical media');
}

function main() {
  console.log('🚀 Media Optimization for Vercel Deployment');
  console.log('='.repeat(50));
  
  if (!checkDependencies()) {
    process.exit(1);
  }
  
  processVideos();
  processImages();
  generateOptimizationReport();
  
  console.log('\n✅ Media optimization complete!');
  console.log('💡 Consider updating your components to use _optimized files');
}

if (require.main === module) {
  main();
}

module.exports = { optimizeVideo, optimizeImage, processVideos, processImages };