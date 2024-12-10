import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slice/AuthSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);


    if (!currentUser) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container">
            <p>
                <strong>Email:</strong> {currentUser.user.email}
            </p>
            <strong>Roles:</strong>
            <ul>
                {currentUser.roles && currentUser.roles.map((role, index) =>
                    <li key={index}>{role}</li>)}
            </ul>

        </div>
    );
};

export default Profile;