// import { useState, useEffect, useRef } from "react";

// export default function ExeatSignOut() {
//   const [currentTime, setCurrentTime] = useState<string>(
//     new Date().toLocaleString()
//   );
//   const [message, setMessage] = useState<string>(
//     "Student Verified Successfully!"
//   );
//   const [cameraActive, setCameraActive] = useState<boolean>(false);
//   const [photoCaptured, setPhotoCaptured] = useState<boolean>(false);
//   const [capturedImageUrl, setCapturedImageUrl] = useState<string>("");
//   const [stream, setStream] = useState<MediaStream | null>(null);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleString());
//     }, 1000);
//     return () => {
//       clearInterval(timer);
//       // Clean up camera stream on unmount
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [stream]);

//   const startCamera = async (): Promise<void> => {
//     try {
//       const constraints = {
//         video: {
//           width: 640,
//           height: 480,
//           facingMode: "user",
//         },
//       };

//       const mediaStream = await navigator.mediaDevices.getUserMedia(
//         constraints
//       );

//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//         // Wait for video to be ready before playing
//         videoRef.current.onloadedmetadata = () => {
//           if (videoRef.current) {
//             videoRef.current.play();
//           }
//         };
//       }

//       setStream(mediaStream);
//       setCameraActive(true);
//       setPhotoCaptured(false);
//       setCapturedImageUrl("");
//       setMessage("📹 Camera Active - Ready for Recognition");
//     } catch (error) {
//       console.error("Camera access denied:", error);
//       setMessage("❌ Could not access camera.");
//     }
//   };

//   const capturePhoto = (): void => {
//     if (!stream || !videoRef.current || !canvasRef.current) {
//       setMessage("❌ Camera is not started");
//       return;
//     }

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     if (!context) {
//       setMessage("❌ Could not get canvas context");
//       return;
//     }

//     // Set canvas dimensions to match video
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     // Draw the current video frame onto the canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert canvas to data URL for display
//     const imageDataUrl = canvas.toDataURL("image/jpeg");
//     setCapturedImageUrl(imageDataUrl);
//     setPhotoCaptured(true);
//     setMessage("📸 Photo Captured - Processing Recognition...");
//   };

//   const stopCamera = (): void => {
//     if (stream) {
//       // Stop all tracks in the stream
//       stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());

//       // Clear video source
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }

//       setStream(null);
//     }
//     setCameraActive(false);
//     setPhotoCaptured(false);
//     setCapturedImageUrl("");
//     setMessage("📷 Camera Stopped");
//   };

//   const handleSignIn = (): void => {
//     setMessage("✅ Sign In Successful - Welcome Back!");
//   };

//   const handleSignOut = (): void => {
//     setMessage("👋 Sign Out Successful - Safe Journey!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-p-700 to-gray-800 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-6">
//             🎓 Covenant University Exeat Sign In/Out
//           </h1>
//           <p className="text-purple-200 text-lg">Exeat Sign In/Out System</p>
//         </div>

//         {/* Main Content Card */}
//         <div className="https://cuportal.covenantuniversity.edu.ng/assets/img/CU4.jpg)">
//           {/* Camera Section */}
//           <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
//             <div className="w-80 h-48 mx-auto rounded-lg overflow-hidden bg-gray-200 mb-4 relative border-4 border-purple-200">
//               <video
//                 ref={videoRef}
//                 className="w-full h-full object-cover"
//                 autoPlay
//                 muted
//                 playsInline
//                 style={{ transform: "scaleX(-1)" }}
//               />
//             </div>

//             <div className="flex gap-3 justify-center">
//               <button
//                 onClick={startCamera}
//                 disabled={cameraActive}
//                 className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
//                   cameraActive
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-gray-600 hover:bg-purple-700 text-white"
//                 }`}
//               >
//                 Start Camera
//               </button>
//               <button
//                 onClick={capturePhoto}
//                 disabled={!cameraActive}
//                 className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
//                   !cameraActive
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700 text-white"
//                 }`}
//               >
//                 Capture Photo
//               </button>
//               <button
//                 onClick={stopCamera}
//                 disabled={!cameraActive}
//                 className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
//                   !cameraActive
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-red-600 hover:bg-red-700 text-white"
//                 }`}
//               >
//                 Stop Camera
//               </button>
//             </div>
//           </div>

//           {/* Captured Image Display */}
//           {photoCaptured && capturedImageUrl && (
//             <div className="bg-blue-50 rounded-xl p-6 mb-6 text-center">
//               <h3 className="text-xl font-bold text-blue-800 mb-4">
//                 📸 Captured Image
//               </h3>
//               <img
//                 src={capturedImageUrl}
//                 alt="Captured"
//                 className="max-w-md mx-auto rounded-lg shadow-lg border-2 border-blue-200"
//               />
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-4 justify-center mb-8">
//             <button
//               onClick={handleSignIn}
//               className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
//             >
//               Sign In
//             </button>
//             <button
//               onClick={handleSignOut}
//               className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
//             >
//               Sign Out
//             </button>
//           </div>

//           {/* Student Details */}
//           <div className="bg-purple-50 rounded-xl p-6 mb-6">
//             <h3 className="text-2xl font-bold text-purple-800 mb-4">
//               Student Details
//             </h3>
//             <div className="grid grid-cols-2 gap-4 text-lg">
//               <div>
//                 <span className="font-semibold text-black-700">Name:</span>{" "}
//                 <span className="text-gray-700">John Doe</span>
//               </div>
//               <div>
//                 <span className="font-semibold text-black-700">Matric:</span>{" "}
//                 <span className="text-gray-700">17CU123456</span>
//               </div>
//               <div>
//                 <span className="font-semibold text-black-700">
//                   Department:
//                 </span>{" "}
//                 <span className="text-gray-700">Computer Science</span>
//               </div>
//               <div>
//                 <span className="font-semibold text-black-700">Level:</span>{" "}
//                 <span className="text-gray-700">400 Level</span>
//               </div>
//               <div>
//                 <span className="font-semibold text-black-700">
//                   Hall of Residence:
//                 </span>
//                 <span className="text-gray-700">Dorcas Hall</span>
//               </div>
//             </div>
//           </div>

//           {/* Verification Message */}
//           <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-center font-bold text-xl mb-4 shadow-lg">
//             {message}
//           </div>

//           {/* Timestamp */}
//           <div className="text-center text-gray-500 text-lg">
//             <span className="font-semibold">Last Action:</span> {currentTime}
//           </div>
//         </div>
//       </div>

//       {/* Hidden canvas for photo capture */}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// }
// This version integrates the backend facial verification and student info fetching
// It assumes your FastAPI backend has an endpoint like /verify/embedding that accepts the image
// and returns student details and a verification result.

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ExeatSignOut() {
  const [, setCurrentTime] = useState<string>(
    new Date().toLocaleString()
  );
  const [message, setMessage] = useState<string>(
    "Start the camera to sign out."
  );
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [photoCaptured, setPhotoCaptured] = useState<boolean>(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [studentDetails, setStudentDetails] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(timer);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async (): Promise<void> => {
    try {
      const constraints = {
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      }
      setStream(mediaStream);
      setCameraActive(true);
      setPhotoCaptured(false);
      setCapturedImageUrl("");
      setMessage("📹 Camera Active - Ready for Sign Out");
    } catch (error) {
      console.error("Camera access denied:", error);
      setMessage("❌ Could not access camera.");
    }
  };

  const captureAndVerify = async (): Promise<void> => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImageUrl(imageDataUrl);
    setPhotoCaptured(true);
    setMessage("🧠 Verifying identity...");

    try {
      const blob = await (await fetch(imageDataUrl)).blob();
      const formData = new FormData();
      formData.append("profile_image", blob, "snapshot.jpg");

      const res = await axios.post(
        "http://localhost:8000/students/verify",
        formData
      );
      const { student, match_score } = res.data;

      if (match_score < 0.6) {
        setMessage("❌ Face not recognized. Please try again.");
        setStudentDetails(null);
      } else {
        setMessage("✅ Student Verified. You may proceed to sign out.");
        setStudentDetails(student);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Verification failed. Please try again.");
    }
  };

  const stopCamera = (): void => {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setStream(null);
    }
    setCameraActive(false);
    setPhotoCaptured(false);
    setCapturedImageUrl("");
    setMessage("📷 Camera Stopped");
  };

  const handleSignOut = (): void => {
    if (!studentDetails) {
      setMessage("❌ You must verify your face before signing out.");
      return;
    }
    setMessage(`👋 Sign Out Successful - Goodbye ${studentDetails.name}`);
    // You could POST to /signout with student ID here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        🎓 CU Exeat Sign Out
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={startCamera}
          disabled={cameraActive}
          className="bg-green-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Start Camera
        </button>
        <button
          onClick={captureAndVerify}
          disabled={!cameraActive}
          className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
        >
          Capture & Verify
        </button>
        <button onClick={stopCamera} className="bg-red-600 px-4 py-2 rounded">
          Stop
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-80 h-48 bg-black rounded"
        />
      </div>

      {photoCaptured && capturedImageUrl && (
        <div className="text-center mb-6">
          <img
            src={capturedImageUrl}
            alt="Captured"
            className="rounded shadow-lg max-w-xs mx-auto"
          />
        </div>
      )}

      {studentDetails && (
        <div className="bg-purple-100 text-black rounded-xl p-4 mb-6 max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-2">Student Info</h2>
          <p>
            <strong>Name:</strong> {studentDetails.full_name}
          </p>
          <p>
            <strong>Matric:</strong> {studentDetails.matriculation_number}
          </p>
          <p>
            <strong>Department:</strong> {studentDetails.program}
          </p>
          <p>
            <strong>Level:</strong> {studentDetails.level}
          </p>
        </div>
      )}

      <div className="text-center mb-4">
        <button
          onClick={handleSignOut}
          className="bg-yellow-500 text-black px-6 py-2 rounded text-lg font-bold shadow hover:bg-yellow-400"
        >
          Sign Out
        </button>
      </div>

      <p className="text-center text-gray-300 italic">{message}</p>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
