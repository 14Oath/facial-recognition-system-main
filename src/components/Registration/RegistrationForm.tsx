import React, { useState, type FormEvent } from "react";
import CameraComponent  from "./CameraComponent";
import type { CapturedImage } from "../../types";

// Types for form data and props
interface RegistrationFormProps {
  onSubmit?: (formData: StudentData, capturedImages: CapturedImage[]) => Promise<void>;
}

export interface StudentData {
  name: string;
  matricNumber: string;
  regNumber: string;
  program: string;
  level: string;
  email: string;
  hallOfResidence: string;
  roomDetails: string;
  gender: string;
  

}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    matricNumber: "",
    regNumber: "",
    program: "",
    level: "",
    email: "",
    hallOfResidence: "",
    roomDetails: "",
    gender: "",
    
  });

  // Captured images from the camera component
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);

  // Form status message
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error" | "info" | "";
  }>({
    text: "",
    type: "",
  });

  const REQUIRED_CAPTURES = 3; // Number of captures required for registration

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle image capture from the camera component
  const handleImageCapture = (imageData: string) => {
    setCapturedImages((prevImages) => {
      const newImages = [
        ...prevImages,
        { data: imageData, timestamp: Date.now() },
      ];

      // Show status message based on capture count
      if (newImages.length >= REQUIRED_CAPTURES) {
        setStatusMessage({
          text: `All required photos captured (${newImages.length}/${REQUIRED_CAPTURES})`,
          type: "success",
        });
      } else {
        setStatusMessage({
          text: `Photo captured! ${newImages.length}/${REQUIRED_CAPTURES} photos taken`,
          type: "info",
        });
      }

      return newImages;
    });
  };

  // Clear captured images
  const clearCapturedImages = () => {
    setCapturedImages([]);
  };

  // Validate email format (must end with @stu.covenantuniversity.edu.ng)
  const validateEmail = (email: string): boolean => {
    return email.endsWith("@stu.cu.edu.ng");
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formData.email)) {
      setStatusMessage({
        text: "Please use a valid Covenant University student email",
        type: "error",
      });
      return;
    }

    // Check if enough photos were captured
    if (capturedImages.length < REQUIRED_CAPTURES) {
      setStatusMessage({
        text: `Please capture ${REQUIRED_CAPTURES} photos before submitting`,
        type: "error",
      });
      return;
    }

    try {
      // Show status message
      setStatusMessage({
        text: "Registering student information...",
        type: "info",
      });

      // Use provided onSubmit handler if available, otherwise mock it
      if (onSubmit) {
        await onSubmit(formData, capturedImages);
      } else {
        // Mock submission for development
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Student Data:", formData);
        console.log("Captured Images:", capturedImages);
      }

      // Show success message
      setStatusMessage({
        text: "Registration completed successfully!",
        type: "success",
      });

      // Reset the form
      setFormData({
        name: "",
        matricNumber: "",
        regNumber: "",
        program: "",
        level: "",
        email: "",
        hallOfResidence: "",
        roomDetails: "",
        gender: "",
  
        
      });
      clearCapturedImages();

      // Scroll to top
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Registration error:", error);
      setStatusMessage({
        text: `Registration error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        type: "error",
      });
    }
  };

  return (
    <section id="registration">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark relative">
          Student Registration
          <span className="block w-20 h-1 bg-[#f3cf00] mx-auto mt-4"></span>
        </h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-[#4a2777] text-white p-4 font-bold text-xl">
            Student Information
          </div>
          <div className="p-6">
            <form id="registrationForm" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="name"
                  name="surname"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  University Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="email"
                  placeholder="youremail@stu.cu.edu.ng"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="program"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Program
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="program"
                  placeholder="Enter your program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="matricNumber"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Matriculation Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="matricNumber"
                  placeholder="Enter your matriculation number"
                  value={formData.matricNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="regNumber"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="regNumber"
                  placeholder="Enter your registration number"
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="roomNumber"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Room Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="roomNumber"
                  placeholder="Enter your Room Number"
                  value={formData.roomDetails}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="gender"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Gender
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md h-12 focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="hallOfResidence"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Hall of Residence
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md h-12 focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="hallOfResidence"
                  value={formData.hallOfResidence}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your hall</option>
                  <option value="daniel">Daniel Hall</option>
                  <option value="joseph">Joseph Hall</option>
                  <option value="peter">Peter Hall</option>
                  <option value="john">John Hall</option>
                  <option value="paul">Paul Hall</option>
                  <option value="esther">Esther Hall</option>
                  <option value="deborah">Deborah Hall</option>
                  <option value="lydia">Lydia Hall</option>
                  <option value="dorcas">Dorcas Hall</option>
                  <option value="mary">Mary Hall</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="level"
                  className="block mb-2 font-medium text-primary-dark"
                >
                  Level
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md h-12 focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                  id="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your level</option>
                  <option value="100">100 Level</option>
                  <option value="200">200 Level</option>
                  <option value="300">300 Level</option>
                  <option value="400">400 Level</option>
                  <option value="500">500 Level</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium text-primary-dark">
                  Facial Registration
                </label>
                <CameraComponent
                  onCapture={handleImageCapture}
                  capturedImages={capturedImages}
                  requiredCaptures={REQUIRED_CAPTURES}
                  onClear={clearCapturedImages}
                />
              </div>

              {statusMessage.text && (
                <div
                  className={`text-center my-4 p-3 rounded-md ${
                    statusMessage.type === "success"
                      ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                      : statusMessage.type === "error"
                      ? "bg-red-100 text-red-800 border-l-4 border-red-500"
                      : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <button
                type="submit"
                className={` bg-[#4a2777] text-white font-bold py-3 px-6 rounded-md transition-all hover:bg-primary-light hover:translate-y-1 hover:shadow-lg ${
                  capturedImages.length < REQUIRED_CAPTURES
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                disabled={capturedImages.length < REQUIRED_CAPTURES}
              >
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
