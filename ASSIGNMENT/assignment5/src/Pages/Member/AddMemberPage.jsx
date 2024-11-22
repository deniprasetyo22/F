import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MemberService from '../../Services/MemberService';

const AddMemberPage = () => {
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    position: '',
    privilage: '',
    libraryCardNumber: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const firstNameInputRef = useRef(null);

  useEffect(() => {
    firstNameInputRef.current.focus();
  }, []);

  // Handle First Name Change
  const handleFirstNameChange = (event) => {
    setMember((prevMember) => ({ ...prevMember, firstName: event.target.value }));
    let errorMessage = '';

    if (!event.target.value.trim()) {
      errorMessage = 'First Name is required.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, firstName: errorMessage }));
  };

  // Handle Last Name Change
  const handleLastNameChange = (event) => {
    setMember((prevMember) => ({ ...prevMember, lastName: event.target.value }));
    let errorMessage = '';

    if (!event.target.value.trim()) {
      errorMessage = 'Last Name is required.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, lastName: errorMessage }));
  };

  // Handle Position Change
  const handlePositionChange = (event) => {
    setMember((prevMember) => ({ ...prevMember, position: event.target.value }));
    let errorMessage = '';

    if (!event.target.value.trim()) {
      errorMessage = 'Position is required.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, position: errorMessage }));
  };

  // Handle Library Card Number Change
  const handleLibraryCardNumberChange = (event) => {
    setMember((prevMember) => ({ ...prevMember, libraryCardNumber: event.target.value }));
    let errorMessage = '';

    if (!event.target.value.trim()) {
      errorMessage = 'Library Card Number is required.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, libraryCardNumber: errorMessage }));
  };

  // Handle Privilage Change
  const handlePrivilageChange = (event) => {
    setMember((prevMember) => ({ ...prevMember, privilage: event.target.value }));
    let errorMessage = '';

    setErrors((prevErrors) => ({ ...prevErrors, privilage: errorMessage }));
  };

  // Handle Notes Change
  const handleNotesChange = (event) => {
    setMember((prevMember) => ({ ...prevMember, notes: event.target.value }));
    let errorMessage = '';

    setErrors((prevErrors) => ({ ...prevErrors, notes: errorMessage }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentErrors = {};
    if (!member.firstName.trim()) currentErrors.firstName = 'First Name is required.';
    if (!member.lastName.trim()) currentErrors.lastName = 'Last Name is required.';
    if (!member.position.trim()) currentErrors.position = 'Position is required.';
    if (!member.libraryCardNumber.trim()) currentErrors.libraryCardNumber = 'Library Card Number is required.';

    setErrors(currentErrors);

    if (!Object.values(currentErrors).some(Boolean)) {
      try {
        await MemberService.create(member);
        Swal.fire('Member Added!', `The member '${member.firstName}' has been successfully added.`, 'success');
        navigate('/members');
      } catch (error) {
        Swal.fire('Error!', 'There was an error adding the book. Please check your data or try again later.', 'error');
      }
    } else {
      Swal.fire('Oops...', 'Please fix the errors before submitting the form.', 'error');
    }
  };

  const resetForm = () => {
    setMember({
      firstName: '',
      lastName: '',
      position: '',
      privilage: '',
      libraryCardNumber: '',
      notes: '',
    });
    setErrors({});
  };

  return (
    <div className="container mx-auto md:px-96">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg">
        <div>
          <Link to="/members">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <h2 className="text-lg font-bold text-center">Add Member</h2>

        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            ref={firstNameInputRef}
            value={member.firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            className={`bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={member.lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            className={`bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block mb-1">Position</label>
          <select
            name="position"
            onChange={handlePositionChange}
            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">-- Select Position --</option>
            <option value="Library Manager">Library Manager</option>
            <option value="Librarian">Librarian</option>
            <option value="Library User">Library User</option>
          </select>
          {errors.position && <p className="text-red-500 text-xs">{errors.position}</p>}
        </div>

        <div>
          <label className="block mb-1">Library Card Number</label>
          <input
            type="text"
            name="libraryCardNumber"
            value={member.libraryCardNumber}
            onChange={handleLibraryCardNumberChange}
            placeholder="Library Card Number"
            className={`bg-white border ${errors.libraryCardNumber ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.libraryCardNumber && <p className="text-red-500 text-xs">{errors.libraryCardNumber}</p>}
        </div>

        <div>
          <label className="block mb-1">Privilage</label>
          <textarea
            name="privilage"
            value={member.privilage}
            onChange={handlePrivilageChange}
            placeholder="Privilage"
            className={`bg-white border ${errors.privilage ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
        </div>
        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            name="notes"
            value={member.notes}
            onChange={handleNotesChange}
            placeholder="Notes"
            className={`bg-white border ${errors.notes ? 'border-red-500' : 'border-gray-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.notes && <p className="text-red-500 text-xs">{errors.notes}</p>}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            type="submit"
            variant="bg-green-600 hover:bg-green-700"
            className="px-4 py-2 text-white rounded"
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={resetForm}
            variant="bg-gray-600 hover:bg-gray-700"
            className="px-4 py-2 text-white rounded"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddMemberPage;
