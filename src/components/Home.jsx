import React, { useRef, useState, useEffect } from "react";
import Header from "./Header.jsx";
import Webcam from "react-webcam";
import { IoMdReverseCamera } from "react-icons/io";
import { FaCamera } from "react-icons/fa6";
// import CameraOverlay from "./CameraOverlay.jsx";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate(); // Initialize navigation
    const [termsModalOpen, setTermsModalOpen] = useState(false); // State for managing the modal
    // const [capturedImage, setCapturedImage] = useState(null);
    // const [showCamera, setShowCamera] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpCorrect, setOtpCorrect] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    // const [otpMessage, setOtpMessage] = useState("");
    const [emp_name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    
    const [sendingOtp, setSendingOtp] = useState(false); // State to track OTP sending status

    const [enteredOtp, setEnteredOtp] = useState(""); // To store user input

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

    const handlePhoneNumberSubmit = async (e) => {
        e.preventDefault();
        setSendingOtp(true); // Set loading state

        const generatedOtp = generateOtp();
        setOtp(generatedOtp); // Save OTP in state

        try {
            const response = await fetch("https://demo.secretary.lk/sendSMSAPI/sendSMS.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mobile: phoneNumber,
                    message: `Your OTP is ${generatedOtp}`,
                }),
            });

            if (response.ok) {
                setOtpSent(true);
                setShowOtpInput(true);
                toast.success("OTP sent to " + phoneNumber);
            } else {
                toast.error("Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred while sending OTP");
        } finally {
            setSendingOtp(false); // Reset loading state after response
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
    
        if (enteredOtp === String(otp)) { // Compare with stored OTP
            setOtpCorrect(true);
            setShowOtpInput(false);
            toast.success("OTP verified!");
    
            // Fetch user details from backend
            try {
                const response = await fetch(`https://demo.secretary.lk/singer_finance/customer.php?emp_mobile=${phoneNumber}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
    
                const userDetails = await response.json();
    console.log(userDetails)
                // Populate form fields
                setName(userDetails[0].emp_name || '');
                setNic(userDetails[0].nic || '');
                setAddress(userDetails[0].address || '');
    
                // toast.success("User details fetched successfully!");
            } catch (error) {
                console.error('Error fetching user details:', error);
                toast.error("Failed to fetch user details.");
            }
        } else {
            toast.error("Incorrect OTP");
        }
    };
    



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requestData = {
            emp_name,
            nic,
            emp_mobile: phoneNumber,
            address,
            status: 'acknowledged'
        };
    
        try {
            const response = await fetch(`https://demo.secretary.lk/singer_finance/customer.php?emp_mobile=${phoneNumber}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("Update successful");
                navigate("/success");
            } else {
                toast.error(result.message || "Update failed.");
            }
        } catch (error) {
            console.error("Error during update:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };
    


    // const [termsModalOpen, setTermsModalOpen] = useState(false);

    const openTermsModal = () => setTermsModalOpen(true);
    const closeTermsModal = () => setTermsModalOpen(false);

    // Block background scroll when modal is open
    useEffect(() => {
        if (termsModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [termsModalOpen]);

    return (
        <div>
            <Header />
            <ToastContainer
                position="top-center"
                toastClassName="rounded-full w-auto px-4 mx-3 mt-4 text-xs py-[-16rem] bg-[#f7f7f7] text-black/60 font-bold shadow-[4px_4px_9px_0px_#00000082]"
                className="custom-toast"
                bodyClassName="custom-toast-body"
                draggable
                hideProgressBar
                closeButton={false}
            />
            <div className="container mt-[6rem] max-w-full pt-3 pb-14 bg-[#f7f7f7] w-full absolute rounded-t-3xl h-full">
                <form className="mx-8 pt-6" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group flex flex-row gap-x-2 items-center">
                        <input
                            type="tel"
                            pattern="[0-9]{10}"
                            name="floating_phone"
                            id="floating_phone"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            placeholder=" "
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            disabled={otpCorrect}
                        />
                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone number
                        </label>
                        {otpCorrect && (
                            <div className="flex items-center justify-center mt-4 z-50 right-2 ">
                                <span className="text-green-500 text-2xl mb-2"><RiVerifiedBadgeFill /></span>
                            </div>
                        )}
                    </div>

                    {!otpSent && !otpCorrect && (
                        <button
                            onClick={handlePhoneNumberSubmit}
                            className="mt-8 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            disabled={sendingOtp}
                        >
                            {sendingOtp ? "Sending..." : "Send OTP"}
                        </button>
                    )}

                    {otpSent && showOtpInput && !otpCorrect && (
                        <div className="flex flex-row items-center mt-8 gap-x-4">
                            <input
                                type="text"
                                maxLength={6}
                                value={enteredOtp}
                                onChange={(e) => setEnteredOtp(e.target.value)}
                                className="border p-2 rounded border-gray-300 focus:ring-red-600 focus:ring-0"
                                placeholder="Enter OTP"
                                required
                            />
                            <button
                                onClick={handleOtpSubmit}
                                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Submit OTP
                            </button>
                        </div>
                    )}

                    {otpCorrect && (

                        <div className="mt-1">

                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={emp_name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    />
                                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="nic"
                                        value={nic}
                                        onChange={(e) => setNic(e.target.value)}
                                        required
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    />

                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NIC</label>

                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    />

                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>

                                </div>
                            </div>
                            <div className="flex items-center mt-6">
                                <input id="link-checkbox" type="checkbox" value="" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue" required />
                                <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-400">
                                    I agree with the{" "}
                                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline" onClick={openTermsModal}>
                                        terms and conditions
                                    </a>
                                </label>
                            </div>

                            <button type="submit" className="mt-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Submit</button>
                        </div>
                    )}

                </form>

                {/* Terms and Conditions Modal */}
                {termsModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div class="modal">
                            <article class="modal-container">
                                <header class="modal-container-header">
                                    <h1 class="modal-container-title">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path fill="currentColor" d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z" />
                                        </svg>
                                        Terms and Conditions
                                    </h1>
                                </header>
                                <section class="modal-container-body rtf">

                                    <h3>Introduction</h3>

                                    <p>We value your privacy and are committed to protecting your personal data in compliance with the Personal Data Protection Act of Sri Lanka. This disclaimer outlines how we collect, store, and process your biometric data, mobile number, and national ID, and seeks your consent for such data processing.</p>

                                    <h3>Purpose of Data Collection</h3>
                                    <p>We collect and store your biometric data, mobile number, and national ID for the following lawful purposes:</p>
                                    <ul>
                                        <li>Identity verification and authentication</li>
                                        <li>Fraud prevention and security enhancement</li>
                                        <li>Compliance with regulatory and legal obligations</li>
                                        <li>Improving customer service and user experience</li>
                                    </ul>

                                    <h3>3. Data Storage, Security, and Retention</h3>
                                    <ul>
                                        <li>Your data will be securely stored in compliance with industry-standard encryption and access controls.</li>
                                        <li>We will retain your data only for as long as necessary to fulfill the stated purposes and in accordance with legal and regulatory requirements.</li>
                                        <li>Unauthorized access, sharing, or misuse of your data is strictly prohibited.</li>
                                    </ul>

                                    <h2>Data Sharing and Third-Party Access</h2>
                                    <p>We will not share your biometric data, mobile number, or national ID with any third parties unless:</p>
                                    <ul>
                                        <li>Required by law or a regulatory authority</li>
                                        <li>Necessary for providing the services you have consented to</li>
                                        <li>Explicitly authorized by you</li>
                                    </ul>

                                    <h3>Your Rights</h3>
                                    <p>Under the Personal Data Protection Act, you have the following rights:</p>
                                    <ul>
                                        <li>Access: Request a copy of your stored data.</li>
                                        <li>Correction: Request correction of any inaccurate or outdated data.</li>
                                        <li>Deletion: Request deletion of your data, subject to legal and contractual obligations.</li>
                                        <li>Withdrawal of Consent: Withdraw your consent at any time, which may affect the services we provide.</li>
                                    </ul>

                                    <h2>Consent Declaration</h2>
                                    <p>By clicking “Agree” you confirm that you:</p>
                                    <ul>
                                        <li>Have read and understood this disclaimer.</li>
                                        <li>Voluntarily consent to the collection, storage, and processing of your biometric data, mobile number, and national ID as per the terms stated above.</li>
                                        <li>Understand that you can withdraw your consent at any time by contacting Singer Finance</li>
                                    </ul>

                                </section>
                                <footer class="modal-container-footer">
                                    <button class="button is-primary" onClick={closeTermsModal}>Close</button>
                                </footer>
                            </article>
                        </div>
                    </div>
                )}


                <p className="fixed bottom-0 w-full text-center py-2 text-gray-400">
                    SmartConnect product
                </p>
            </div>
        </div>
    );
}

export default Home;
