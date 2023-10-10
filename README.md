# Handy Hindi Sign Language detector
## Description
- Developed an application aimed at real-time detection and interpretation of Hindi sign language gestures
- Utilised a scalable microservices architecture for seamless modularity
- One microservice, based on the MERN stack, efficiently handles authentication, user management, and other REST APIs
- Another microservice is built on FastAPI Framework, which predicts the gestures in the stream images and serves the result in real-time to the [user
- Gesture detection is achieved using the YOLOv3 deep learning-based algorithm, which has been trained on 48 gesture classes
## Achievements
- Created a fully functional portal that can integrate with existing or new microservice and scale independently with new features and services
- The portal supports real-time uninterrupted detection capabilities up to ~5 fps with audio and visual feedback of the detected gesture
- Employed the asyncio library to manage image streams of users concurrently, efficiently serving multiple users from a single instance
- Deployed and tested the application to scale using Google Cloud Run a fully managed compute platform for containers

[Demo Link](https://drive.google.com/file/d/1liY-vrG_Zgkmed7NbvMXr9cpUkSkV6t3/view?t=54s)

## Architecture 
<img width="1732" alt="Handy Architecture" src="https://github.com/atharva-310/hindi-sign-language-detector/assets/77790083/1d204a1b-0a17-4476-88b3-ce825a6ff6fb">

## User Interface
![handy Ui](https://github.com/atharva-310/hindi-sign-language-detector/assets/77790083/90a48314-5128-43d2-8afe-2e238be46b96)

