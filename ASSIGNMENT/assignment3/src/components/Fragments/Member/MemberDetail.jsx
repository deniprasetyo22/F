// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const MemberDetail = () => {
//     const { id } = useParams(); // Retrieve the member ID from the URL
//     const members = JSON.parse(localStorage.getItem('members')) || [];
//     const member = members.find((m) => m.id === id); // Find the specific member by ID

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [updatedMember, setUpdatedMember] = useState(member);

//     // Handle input changes for the modal form
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedMember({
//             ...updatedMember,
//             [name]: value,
//         });
//     };

//     // Handle form submission to update member details
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const updatedMembers = members.map((m) =>
//             m.id === updatedMember.id ? updatedMember : m
//         );
//         localStorage.setItem('members', JSON.stringify(updatedMembers));
//         setIsModalOpen(false);
//         Swal.fire({
//             title: 'Success!',
//             text: 'The member details have been updated.',
//             icon: 'success',
//             confirmButtonText: 'OK',
//             timer: 2000,
//             timerProgressBar: true,
//             willClose: () => {
//                 Swal.stopTimer();
//             }
//         });
//     };

//     return (
//         <div className="container mx-auto p-4 max-w-lg">
//             <div className="bg-white shadow-md rounded-lg p-6">
//                 <h1 className="text-xl text-center font-bold mb-5">Member Detail</h1>

//                 <div className="grid grid-cols-3 gap-4 mb-4 md:px-10">
//                     <p className="font-semibold">Full Name</p>
//                     <p className="text-center">:</p>
//                     <p>{member.fullName}</p>

//                     <p className="font-semibold">Email</p>
//                     <p className="text-center">:</p>
//                     <p>{member.email}</p>

//                     <p className="font-semibold">Gender</p>
//                     <p className="text-center">:</p>
//                     <p>{member.gender}</p>

//                     <p className="font-semibold">Phone</p>
//                     <p className="text-center">:</p>
//                     <p>{member.phone}</p>

//                     <p className="font-semibold">Address</p>
//                     <p className="text-center">:</p>
//                     <p>{member.address}</p>
//                 </div>

//                 <div className="flex justify-center mt-5 space-x-4">
//                     <Link to={'/members'} className="bg-gray-500 text-white px-4 py-2 rounded">
//                         Back
//                     </Link>
//                     <button
//                         onClick={() => setIsModalOpen(true)} // Open the modal on click
//                         className="bg-yellow-500 text-white px-4 py-2 rounded"
//                     >
//                         Edit
//                     </button>
//                 </div>
//             </div>

//             {/* Modal for editing the member */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg w-96">
//                         <h2 className="text-xl font-bold mb-4 text-center">Edit Member</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-semibold">Full Name</label>
//                                 <input
//                                     type="text"
//                                     name="fullName"
//                                     value={updatedMember.fullName}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-semibold">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={updatedMember.email}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1">Gender</label>
//                                 <div className="flex space-x-4">
//                                     <label className="inline-flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="gender"
//                                             value="Male"
//                                             checked={updatedMember.gender === 'Male'}
//                                             onChange={handleInputChange}
//                                             className="form-radio text-blue-500"
//                                             required
//                                         />
//                                         <span className="ml-2">Male</span>
//                                     </label>
//                                     <label className="inline-flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="gender"
//                                             value="Female"
//                                             checked={updatedMember.gender === 'Female'}
//                                             onChange={handleInputChange}
//                                             className="form-radio text-blue-500"
//                                         />
//                                         <span className="ml-2">Female</span>
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-semibold">Phone</label>
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     value={updatedMember.phone}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-semibold">Address</label>
//                                 <textarea
//                                     name="address"
//                                     value={updatedMember.address}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>

//                             <div className="flex justify-center space-x-4">
//                                 <button
//                                     type="submit"
//                                     className="bg-green-600 text-white px-4 py-2 rounded"
//                                 >
//                                     Save
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)} // Close the modal
//                                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MemberDetail;
