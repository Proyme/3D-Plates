#!/bin/bash
# Installation script for Nerfstudio on RunPod

echo "🚀 Installing Nerfstudio for 3D Reconstruction..."

# Update system
apt-get update

# Install system dependencies
echo "📦 Installing system dependencies..."
apt-get install -y \
    ffmpeg \
    libgl1-mesa-glx \
    libglib2.0-0 \
    colmap

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install --upgrade pip

# Install PyTorch with CUDA (already installed on RunPod usually)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# Install Nerfstudio
echo "🎨 Installing Nerfstudio..."
pip install nerfstudio

# Install additional dependencies
pip install trimesh

# Install CLI
ns-install-cli

echo "✅ Installation complete!"
echo ""
echo "Test with:"
echo "  ns-train --help"
echo ""
echo "Now modify app.py to use Nerfstudio reconstruction"
