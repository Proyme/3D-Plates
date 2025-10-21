from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
import torch
from pathlib import Path
import logging
from werkzeug.utils import secure_filename
import subprocess
import json
from datetime import datetime

# Configuration
app = Flask(__name__)
CORS(app)

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Directories
UPLOAD_FOLDER = Path('uploads')
OUTPUT_FOLDER = Path('outputs')
UPLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)

# Configuration
ALLOWED_EXTENSIONS = {'mp4', 'mov', 'avi', 'mkv'}
MAX_FILE_SIZE = 500 * 1024 * 1024  # 500MB

# Job tracking
jobs = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def check_gpu():
    """Check if CUDA is available and log GPU info"""
    if torch.cuda.is_available():
        gpu_name = torch.cuda.get_device_name(0)
        logger.info(f"GPU detected: {gpu_name}")
        logger.info(f"CUDA version: {torch.version.cuda}")
        return True
    else:
        logger.warning("No GPU detected. Running on CPU (will be slower)")
        return False

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    gpu_available = torch.cuda.is_available()
    gpu_name = torch.cuda.get_device_name(0) if gpu_available else "None"
    
    return jsonify({
        'status': 'healthy',
        'gpu_available': gpu_available,
        'gpu_name': gpu_name,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/reconstruct', methods=['POST'])
def reconstruct_3d():
    """
    Main endpoint for 3D reconstruction
    Accepts video file and returns job ID for tracking
    """
    try:
        # Check if video file is present
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400
        
        video_file = request.files['video']
        
        if video_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(video_file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: mp4, mov, avi, mkv'}), 400
        
        # Generate unique job ID
        job_id = str(uuid.uuid4())
        
        # Save uploaded video
        filename = secure_filename(video_file.filename)
        video_path = UPLOAD_FOLDER / f"{job_id}_{filename}"
        video_file.save(str(video_path))
        
        logger.info(f"Video uploaded: {video_path}")
        
        # Initialize job
        jobs[job_id] = {
            'status': 'processing',
            'progress': 0,
            'video_path': str(video_path),
            'created_at': datetime.now().isoformat()
        }
        
        # Start reconstruction process (async in production)
        try:
            output_path = process_reconstruction(job_id, video_path)
            
            jobs[job_id]['status'] = 'completed'
            jobs[job_id]['progress'] = 100
            jobs[job_id]['model_path'] = str(output_path)
            jobs[job_id]['completed_at'] = datetime.now().isoformat()
            
            # Return model URL
            model_url = f"http://{request.host}/api/model/{job_id}"
            
            return jsonify({
                'jobId': job_id,
                'status': 'completed',
                'modelUrl': model_url
            }), 200
            
        except Exception as e:
            logger.error(f"Reconstruction failed: {str(e)}")
            jobs[job_id]['status'] = 'error'
            jobs[job_id]['error'] = str(e)
            return jsonify({'error': f'Reconstruction failed: {str(e)}'}), 500
        
    except Exception as e:
        logger.error(f"Error in reconstruct endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/status/<job_id>', methods=['GET'])
def get_job_status(job_id):
    """Get status of a reconstruction job"""
    if job_id not in jobs:
        return jsonify({'error': 'Job not found'}), 404
    
    job = jobs[job_id]
    response = {
        'jobId': job_id,
        'status': job['status'],
        'progress': job.get('progress', 0)
    }
    
    if job['status'] == 'completed':
        model_url = f"http://{request.host}/api/model/{job_id}"
        response['modelUrl'] = model_url
    elif job['status'] == 'error':
        response['error'] = job.get('error', 'Unknown error')
    
    return jsonify(response)

@app.route('/api/model/<job_id>', methods=['GET'])
def get_model(job_id):
    """Download the reconstructed 3D model"""
    if job_id not in jobs:
        return jsonify({'error': 'Job not found'}), 404
    
    job = jobs[job_id]
    
    if job['status'] != 'completed':
        return jsonify({'error': 'Model not ready'}), 400
    
    model_path = job.get('model_path')
    if not model_path or not os.path.exists(model_path):
        return jsonify({'error': 'Model file not found'}), 404
    
    return send_file(model_path, as_attachment=True)

def process_reconstruction(job_id, video_path):
    """
    Process video and generate 3D model
    This is a placeholder - integrate your actual 3D reconstruction model here
    
    For RTX 4090, you can use:
    - Instant-NGP (NVIDIA)
    - Nerfstudio
    - Gaussian Splatting
    - COLMAP + Neural Radiance Fields
    """
    logger.info(f"Starting reconstruction for job {job_id}")
    
    # Update progress
    jobs[job_id]['progress'] = 10
    
    # Extract frames from video
    frames_dir = UPLOAD_FOLDER / f"{job_id}_frames"
    frames_dir.mkdir(exist_ok=True)
    
    extract_frames(video_path, frames_dir)
    jobs[job_id]['progress'] = 30
    
    # Run 3D reconstruction
    # This is where you'd integrate your actual 3D reconstruction pipeline
    # For example, using Instant-NGP, Nerfstudio, or Gaussian Splatting
    
    output_path = OUTPUT_FOLDER / f"{job_id}_model.obj"
    
    # Placeholder: Create a simple cube OBJ file for testing
    create_placeholder_model(output_path)
    
    jobs[job_id]['progress'] = 90
    
    logger.info(f"Reconstruction completed for job {job_id}")
    
    return output_path

def extract_frames(video_path, output_dir):
    """Extract frames from video using ffmpeg"""
    try:
        cmd = [
            'ffmpeg',
            '-i', str(video_path),
            '-vf', 'fps=10',  # 10 frames per second
            '-q:v', '2',  # High quality
            str(output_dir / 'frame_%04d.jpg')
        ]
        
        subprocess.run(cmd, check=True, capture_output=True)
        logger.info(f"Frames extracted to {output_dir}")
        
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg error: {e.stderr.decode()}")
        raise Exception("Failed to extract frames from video")
    except FileNotFoundError:
        logger.error("FFmpeg not found. Please install ffmpeg.")
        raise Exception("FFmpeg not installed")

def create_placeholder_model(output_path):
    """
    Create a placeholder OBJ file for testing
    Replace this with actual 3D reconstruction output
    """
    obj_content = """# Placeholder 3D Model
# Replace with actual reconstruction output

v -1.0 -1.0 1.0
v 1.0 -1.0 1.0
v 1.0 1.0 1.0
v -1.0 1.0 1.0
v -1.0 -1.0 -1.0
v 1.0 -1.0 -1.0
v 1.0 1.0 -1.0
v -1.0 1.0 -1.0

vn 0.0 0.0 1.0
vn 0.0 0.0 -1.0
vn 0.0 1.0 0.0
vn 0.0 -1.0 0.0
vn 1.0 0.0 0.0
vn -1.0 0.0 0.0

f 1//1 2//1 3//1 4//1
f 5//2 8//2 7//2 6//2
f 1//3 4//3 8//3 5//3
f 2//4 6//4 7//4 3//4
f 4//5 3//5 7//5 8//5
f 1//6 5//6 6//6 2//6
"""
    
    with open(output_path, 'w') as f:
        f.write(obj_content)
    
    logger.info(f"Placeholder model created at {output_path}")

# Integration examples for popular 3D reconstruction methods:

def run_instant_ngp(frames_dir, output_path):
    """
    Example integration with NVIDIA Instant-NGP
    Requires: https://github.com/NVlabs/instant-ngp
    """
    # This is pseudocode - adapt to your setup
    cmd = [
        'instant-ngp',
        '--scene', str(frames_dir),
        '--output', str(output_path),
        '--gpu', '0'
    ]
    subprocess.run(cmd, check=True)

def run_nerfstudio(frames_dir, output_path):
    """
    Example integration with Nerfstudio
    Requires: https://docs.nerf.studio/
    """
    # This is pseudocode - adapt to your setup
    cmd = [
        'ns-train',
        'nerfacto',
        '--data', str(frames_dir),
        '--output-dir', str(output_path.parent)
    ]
    subprocess.run(cmd, check=True)

def run_gaussian_splatting(frames_dir, output_path):
    """
    Example integration with 3D Gaussian Splatting
    Requires: https://github.com/graphdeco-inria/gaussian-splatting
    """
    # This is pseudocode - adapt to your setup
    cmd = [
        'python', 'train.py',
        '-s', str(frames_dir),
        '-m', str(output_path.parent)
    ]
    subprocess.run(cmd, check=True)

if __name__ == '__main__':
    # Check GPU on startup
    check_gpu()
    
    # Run server
    app.run(host='0.0.0.0', port=5000, debug=True)
