import asyncio
from typing import List, Tuple
import cv2
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import time

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}

class Report(BaseModel):
    hands: List[Tuple[int, int, int, int]]

# Fill the queue specific to the websocket instance 
async def receive(websocket: WebSocket, queue: asyncio.Queue):
    bytes = await websocket.receive_bytes()
    try:
        queue.put_nowait(bytes)     
    except asyncio.QueueFull:
        pass


async def detect(websocket: WebSocket, queue: asyncio.Queue):

    # Model Initialization
    net = cv2.dnn.readNetFromDarknet("yolov3_custom_48class.cfg",r"yolov3_custom_48class_10000.weights")
    classes = ['अं','ए','ऐ','औ','ञ','ङ','अ','आ','इ','ई','ऋ','ओ','अः','क','ख','ग','घ','च','छ','ज','झ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','श्र','क्ष','त्र','ज्ञ']
    print("detector started")
    while True:

        # Fetching the Image from the queue
        bytes = await queue.get()    
        data = np.frombuffer(bytes, dtype=np.uint8)

        # Image Preprocessing
        img = cv2.imdecode(data, 1)
        # img = cv2.resize(img,(920,620))
        hight,width,_ = img.shape
        blob = cv2.dnn.blobFromImage(img, 1/255,(224,224),(0,0,0),swapRB = True,crop= False)
        
        # Object Detection
        net.setInput(blob)
        output_layers_name = net.getUnconnectedOutLayersNames()
        layerOutputs = net.forward(output_layers_name)

        # Post-processing
        boxes =[]
        confidences = []
        class_ids = []

        
        for output in layerOutputs:
            for detection in output:
                score = detection[5:]
                class_id = np.argmax(score)
                confidence = score[class_id]
                if confidence > 0.5:
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * hight)
                    w = int(detection[2] * width)
                    h = int(detection[3]* hight)

                    x = int(center_x - w/2)
                    y = int(center_y - h/2)



                    boxes.append([x,y,w,h])
                    confidences.append((float(confidence)))
                    class_ids.append(class_id)

        indexes = cv2.dnn.NMSBoxes(boxes,confidences,.5,.4)
        
        # Sending detection results
        if  len(indexes)>0:
            for i in indexes.flatten():
                x,y,w,h = boxes[i]
                label = str(classes[class_ids[i]])
                confidence = str(round(confidences[i],2))
                print( label + " " + confidence )
                print((x,y),(x+w,y+h))
                report = {
                    "label": label,
                    "confidence": confidence,
                    "box": {
                        "x": x,
                        "y": y,
                        "width": w,
                        "height": h
                    }
                }
                await websocket.send_json(report)
   
        



@app.websocket("/detector")
async def face_detection(websocket: WebSocket):
    await websocket.accept()
    queue: asyncio.Queue = asyncio.Queue(maxsize=20)
    detect_task = asyncio.create_task(detect(websocket, queue))

    # Will continously receive the images
    try:
        while True:
            await receive(websocket, queue)
    except WebSocketDisconnect:
        detect_task.cancel()
        await websocket.close()


@app.on_event("startup")
async def startup():
    print("Server Started")

# Test Route
@app.get('/')
def test_route():
    return {"message": "This api is working"}
