import React from 'react';

const Loading = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return null;
};

export default Loading;