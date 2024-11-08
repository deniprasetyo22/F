// import React, { useEffect, useRef, useState } from 'react';
// import Swal from 'sweetalert2';
// import { v4 as uuidv4 } from "uuid";

// const AddMember = ({ onAdd, onCancel, members }) => {
//     const [member, setMember] = useState({
//         id: '',
//         fullName: '',
//         email: '',
//         gender: '',
//         phone: '',
//         address: ''
//     });

//     const [hasInput, setHasInput] = useState(false);
//     const [errors, setErrors] = useState({});

//     const fullNameInputRef = useRef(null);

//     useEffect(() => {
//         fullNameInputRef.current.focus();
//     }, []);

//     // Validasi Full Name
//     const handleFullNameChange = (event) => {
//         setMember((prevMember) => ({ ...prevMember, fullName: event.target.value }));
//         let errorMessage = "";

//         if (!event.target.value.trim()) {
//             errorMessage = "Full Name is required.";
//         }

//         setErrors((prevErrors) => ({ ...prevErrors, fullName: errorMessage }));
//     };

//     // Validasi Email
//     const handleEmailChange = (event) => {
//         setMember((prevMember) => ({ ...prevMember, email: event.target.value }));
//         let errorMessage = "";

//         if (!event.target.value.trim()) {
//             errorMessage = "Email is required.";
//         } else if (!/\S+@\S+\.\S+/.test(event.target.value)) {
//             errorMessage = "Please enter a valid email address.";
//         }

//         setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
//     };

//     // Validasi Phone
//     const handlePhoneChange = (event) => {
//         setMember((prevMember) => ({ ...prevMember, phone: event.target.value }));
//         let errorMessage = "";

//         // Validasi: nomor telepon harus dimulai dengan "+" diikuti kode negara dan angka
//         const phoneRegex = /^\+(\d{1,3})\d{9,14}$/;  // Format: +[kode negara][nomor]

//         if (!event.target.value.trim()) {
//             errorMessage = "Phone number is required.";
//         } else if (!phoneRegex.test(event.target.value)) {
//             errorMessage = "Phone number must follow correct international format (+62...) and 9-14 digits.";
//         }

//         setErrors((prevErrors) => ({ ...prevErrors, phone: errorMessage }));
//     };


//     // Validasi Gender
//     const handleGenderChange = (event) => {
//         setMember((prevMember) => ({ ...prevMember, gender: event.target.value }));
//         setErrors((prevErrors) => ({ ...prevErrors, gender: "" }));
//     };

//     // Validasi Address
//     const handleAddressChange = (event) => {
//         setMember((prevMember) => ({ ...prevMember, address: event.target.value }));
//         let errorMessage = "";

//         if (!event.target.value.trim()) {
//             errorMessage = "Address is required.";
//         }

//         setErrors((prevErrors) => ({ ...prevErrors, address: errorMessage }));
//     };

//     // Handle submit
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         let currentErrors = { ...errors };

//         // Check for any empty required fields and add error messages
//         if (!member.fullName.trim()) currentErrors.fullName = "Full Name is required.";
//         if (!member.email.trim()) currentErrors.email = "Email is required.";
//         if (!member.phone.trim()) currentErrors.phone = "Phone number is required.";
//         if (!member.gender.trim()) currentErrors.gender = "Gender is required.";
//         if (!member.address.trim()) currentErrors.address = "Address is required.";

//         // Update errors state
//         setErrors(currentErrors);

//         // Check if there are any errors left after validation
//         let isValid = true;
//         for (const key in currentErrors) {
//             if (currentErrors[key]) {
//                 isValid = false;
//                 break;
//             }
//         }

//         if (isValid) {
//             const newId = uuidv4();
//             onAdd({ ...member, id: newId });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Member Added!',
//                 text: `The member '${member.fullName}' has been successfully added.`,
//                 confirmButtonText: 'OK',
//                 timer: 2000,
//                 timerProgressBar: true,
//                 willClose: () => {
//                     Swal.stopTimer();
//                 }
//             });
//             resetForm();
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please fix the errors before submitting the form.',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     // Reset form
//     const resetForm = () => {
//         setMember({
//             id: '',
//             fullName: '',
//             email: '',
//             gender: '',
//             phone: '',
//             address: ''
//         });
//         setHasInput(false);
//         setErrors({});
//     };

//     return (
//         <div className="md:mt-5">
//             <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg">
//                 <h2 className="text-lg font-bold text-center">"Add Member"</h2>

//                 <div>
//                     <label className="block mb-1">Full Name</label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         ref={fullNameInputRef}
//                         value={member.fullName}
//                         onChange={handleFullNameChange}
//                         placeholder="Full Name"
//                         className={`bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
//                     />
//                     {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
//                 </div>

//                 <div>
//                     <label className="block mb-1">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={member.email}
//                         onChange={handleEmailChange}
//                         placeholder="Email"
//                         className={`bg-white border ${errors.email ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
//                     />
//                     {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//                 </div>

//                 <div>
//                     <label className="block mb-1">Phone</label>
//                     <input
//                         type="text"
//                         name="phone"
//                         value={member.phone}
//                         onChange={handlePhoneChange}
//                         placeholder="+62xxxxxxx"
//                         className={`bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
//                     />
//                     {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
//                 </div>

//                 <div>
//                     <label className="block mb-1">Gender</label>
//                     <div className="flex space-x-4">
//                         <label className="inline-flex items-center">
//                             <input
//                                 type="radio"
//                                 name="gender"
//                                 value="Male"
//                                 checked={member.gender === 'Male'}
//                                 onChange={handleGenderChange}
//                                 className="form-radio text-blue-500"
//                             />
//                             <span className="ml-2">Male</span>
//                         </label>
//                         <label className="inline-flex items-center">
//                             <input
//                                 type="radio"
//                                 name="gender"
//                                 value="Female"
//                                 checked={member.gender === 'Female'}
//                                 onChange={handleGenderChange}
//                                 className="form-radio text-blue-500"
//                             />
//                             <span className="ml-2">Female</span>
//                         </label>
//                     </div>
//                     {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
//                 </div>

//                 <div>
//                     <label className="block mb-1">Address</label>
//                     <textarea
//                         name="address"
//                         value={member.address}
//                         onChange={handleAddressChange}
//                         placeholder="Address"
//                         className={`bg-white border ${errors.address ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
//                     />
//                     {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
//                 </div>

//                 <div className="flex justify-center space-x-4">
//                     <button
//                         type="submit"
//                         className="bg-green-600 text-white p-2 px-5 rounded-md"
//                     >
//                         Submit
//                     </button>
//                     {hasInput && (
//                         <button
//                             type="button"
//                             onClick={() => { resetForm(); onCancel(); }}
//                             className="bg-gray-500 text-white p-2 px-5 rounded-md"
//                         >
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddMember;
