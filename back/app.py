from flask import Flask, jsonify
from flask_cors import CORS
import os
import time
import pygame
import pygame.camera
import base64
import cups

app = Flask(__name__)
CORS(app)

CAMERA_RESOLUTION_VIDEO = (640, 480)
PHOTOS_FOLDER = 'photos'

# Variable globale pour la caméra
myCamera = None

# Fonction pour initialiser et démarrer la caméra
def startCamera():
    global myCamera
    try:
        pygame.camera.init()
        cam_list = pygame.camera.list_cameras()
        if not cam_list:
            return jsonify({'message': 'No camera found'}), 404

        myCamera = pygame.camera.Camera(cam_list[0], CAMERA_RESOLUTION_VIDEO)
        myCamera.start()
        return jsonify({'message': 'Camera started'})
    except Exception as e:
        return jsonify({'message': 'Failed to start camera', 'error': str(e)}), 500

# Fonction pour créer l'application Flask avec le contexte
def create_app():
    app = Flask(__name__)
    CORS(app)

    # Démarrer la caméra au moment de l'initialisation de l'application
    with app.app_context():
        startCamera()

    # Routes de l'application Flask
    @app.route('/capture')
    def capture():
        global myCamera
        try:
            if myCamera is None:
                return jsonify({'message': 'Camera not started'}), 400

            currentPhoto = myCamera.get_image()
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            filename = f'photo_{timestamp}.jpg'
            filepath = os.path.join(PHOTOS_FOLDER, filename)
            pygame.image.save(currentPhoto, filepath)
            return jsonify({'message': 'Photo captured', 'filename': filename})
        except Exception as e:
            return jsonify({'message': 'Failed to capture photo', 'error': str(e)}), 500

    @app.route('/print/<filename>', methods=['GET'])
    def print_photo(filename):
        try:
            connection = cups.Connection()
            printers = connection.getPrinters()
            printer_name = "Canon_SELPHY_CP1300"
            connection.enablePrinter(printer_name)
            myPrinter = printers[printer_name]
            state = myPrinter['printer-state']  
            if state != 4:
                path = os.path.join(PHOTOS_FOLDER, filename)
                connection.printFile(printer_name, path, "test", {})
                return jsonify({'message': 'Printing started'})
            else:
                return jsonify({'error': 'Printer busy, cannot print'}), 400
        except Exception as e:
            return jsonify({'error': 'Print error', 'message': str(e)}), 500

    @app.route('/photos/<filename>', methods=['GET'])
    def get_photo(filename):
        filepath = os.path.join(PHOTOS_FOLDER, filename)
        if os.path.exists(filepath):
            with open(filepath, 'rb') as f:
                image_data = f.read()
                encoded_image = base64.b64encode(image_data).decode('utf-8')
                return jsonify({'image': encoded_image})    
        else:
            return jsonify({'error': 'Photo not found'}), 404

    @app.route('/photos', methods=['GET'])
    def get_all_photos():
        photos = []
        for filename in os.listdir(PHOTOS_FOLDER):
            filepath = os.path.join(PHOTOS_FOLDER, filename)
            if os.path.isfile(filepath):
                with open(filepath, 'rb') as f:
                    image_data = f.read()
                    encoded_image = base64.b64encode(image_data).decode('utf-8')
                    photos.append({'filename': filename, 'image': encoded_image})
        if photos:
            return jsonify({'photos': photos})
        else:
            return jsonify({'error': 'No photos found'}), 404

    return app

if __name__ == '__main__':
    # Vérifie si le dossier 'static' existe pour sauvegarder les photos
    if not os.path.exists('static'):
        os.makedirs('static')
    
    # Créer l'application Flask avec le contexte d'application
    app = create_app()

    # Démarrer l'application Flask
    app.run(host='0.0.0.0', port=5000)
