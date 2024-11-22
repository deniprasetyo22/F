import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import MemberService from '../../Services/MemberService';
import Button from '../../components/Elements/Button';

const MemberDetailPage = () => {
    const { userId } = useParams();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedMember, setUpdatedMember] = useState({
        userId: userId,
        firstName: '',
        lastName: '',
        position: '',
        libraryCardNumber: '',
        privilage: '',
        notes: '',
    });

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await MemberService.get(userId);
                setMember(response.data);
                setUpdatedMember({
                    userId: response.data.userId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    position: response.data.position,
                    libraryCardNumber: response.data.libraryCardNumber,
                    privilage: response.data.privilage,
                    notes: response.data.notes,
                });
            } catch (error) {
                console.error("Error fetching member details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await MemberService.update(userId, {
                userId: updatedMember.userId,
                firstName: updatedMember.firstName,
                lastName: updatedMember.lastName,
                position: updatedMember.position,
                libraryCardNumber: updatedMember.libraryCardNumber,
                privilege: updatedMember.privilege,
                notes: updatedMember.notes,
            });
            const response = await MemberService.get(userId);
            setMember(response.data);
            setIsModalOpen(false);
            Swal.fire({
                title: 'Success!',
                text: 'The member details have been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error("Error updating member details:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the member details. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:w-1/2">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-xl text-center font-bold mb-5">Member Detail</h1>

                <div className="grid grid-cols-3 gap-4 mb-4 md:px-10">
                    <p className="font-semibold">User ID</p>
                    <p className="text-center">:</p>
                    <p>{member.userId}</p>

                    <p className="font-semibold">Full Name</p>
                    <p className="text-center">:</p>
                    <p>{`${member.firstName} ${member.lastName}`}</p>

                    <p className="font-semibold">Position</p>
                    <p className="text-center">:</p>
                    <p>{member.position}</p>

                    <p className="font-semibold">Library Card Number</p>
                    <p className="text-center">:</p>
                    <p> {member.libraryCardNumber}</p>

                    <p className="font-semibold">Privilege</p>
                    <p className="text-center">:</p>
                    <p>
                        {member.privilage === null ? <span>No Privilege</span> : member.privilage}
                    </p>

                    <p className="font-semibold">Notes</p>
                    <p className="text-center">:</p>
                    <p>
                        {member.notes === null ? <span>Null</span> : member.notes}
                    </p>
                </div>

                <div className="flex justify-center mt-5 space-x-4">
                    <Link to={'/members'} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Back
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Member</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={updatedMember.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={updatedMember.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={updatedMember.position}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Library Card Number</label>
                                <input
                                    type="text"
                                    name="libraryCardNumber"
                                    value={updatedMember.libraryCardNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Privilege</label>
                                <input
                                    type="text"
                                    name="privilege"
                                    value={updatedMember.privilage}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Notes</label>
                                <textarea
                                    name="notes"
                                    value={updatedMember.notes}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    type="submit"
                                    variant="bg-green-500 hover:bg-green-600"
                                >
                                    Save
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberDetailPage;
