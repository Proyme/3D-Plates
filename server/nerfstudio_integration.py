"""
Nerfstudio Integration for 3D Reconstruction
"""
import subprocess
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

def run_nerfstudio_reconstruction(frames_dir, output_path, job_id, jobs):
    """
    Run Nerfstudio reconstruction pipeline
    
    Args:
        frames_dir: Directory containing extracted frames
        output_path: Path where to save the final model
        job_id: Job ID for progress tracking
        jobs: Jobs dictionary for updating progress
    """
    try:
        # Step 1: Process images with COLMAP (structure from motion)
        logger.info(f"[{job_id}] Running COLMAP...")
        jobs[job_id]['progress'] = 40
        
        colmap_dir = frames_dir.parent / f"{job_id}_colmap"
        colmap_dir.mkdir(exist_ok=True)
        
        # Run ns-process-data (Nerfstudio's data processing)
        process_cmd = [
            'ns-process-data',
            'images',
            '--data', str(frames_dir),
            '--output-dir', str(colmap_dir),
            '--skip-colmap', 'False'
        ]
        
        subprocess.run(process_cmd, check=True, capture_output=True)
        logger.info(f"[{job_id}] COLMAP completed")
        jobs[job_id]['progress'] = 60
        
        # Step 2: Train NeRF model (using nerfacto - fast and good quality)
        logger.info(f"[{job_id}] Training NeRF model...")
        
        nerf_output = frames_dir.parent / f"{job_id}_nerf"
        nerf_output.mkdir(exist_ok=True)
        
        train_cmd = [
            'ns-train',
            'nerfacto',  # Fast NeRF variant
            '--data', str(colmap_dir),
            '--output-dir', str(nerf_output),
            '--max-num-iterations', '5000',  # Adjust based on quality needs
            '--pipeline.model.predict-normals', 'True'
        ]
        
        subprocess.run(train_cmd, check=True, capture_output=True)
        logger.info(f"[{job_id}] NeRF training completed")
        jobs[job_id]['progress'] = 80
        
        # Step 3: Export to mesh (OBJ)
        logger.info(f"[{job_id}] Exporting mesh...")
        
        # Find the latest checkpoint
        config_path = nerf_output / "nerfacto" / "config.yml"
        
        export_cmd = [
            'ns-export',
            'poisson',  # Poisson surface reconstruction
            '--load-config', str(config_path),
            '--output-dir', str(output_path.parent),
            '--num-points', '1000000',  # 1M points for good quality
            '--remove-outliers', 'True',
            '--normal-method', 'model'
        ]
        
        subprocess.run(export_cmd, check=True, capture_output=True)
        
        # Rename exported file to expected output path
        exported_mesh = output_path.parent / "poisson_mesh.ply"
        if exported_mesh.exists():
            # Convert PLY to OBJ if needed
            convert_ply_to_obj(exported_mesh, output_path)
        
        logger.info(f"[{job_id}] Mesh export completed")
        jobs[job_id]['progress'] = 90
        
        return True
        
    except subprocess.CalledProcessError as e:
        logger.error(f"[{job_id}] Nerfstudio error: {e.stderr.decode()}")
        raise Exception(f"Nerfstudio reconstruction failed: {e.stderr.decode()}")
    except Exception as e:
        logger.error(f"[{job_id}] Reconstruction error: {str(e)}")
        raise

def convert_ply_to_obj(ply_path, obj_path):
    """Convert PLY to OBJ format"""
    try:
        import trimesh
        mesh = trimesh.load(str(ply_path))
        mesh.export(str(obj_path))
        logger.info(f"Converted {ply_path} to {obj_path}")
    except ImportError:
        logger.warning("trimesh not installed, keeping PLY format")
        # Just copy the PLY file
        import shutil
        shutil.copy(ply_path, obj_path.with_suffix('.ply'))
