import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-bootstrap';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const DashboardPage = () => {
    const [bookCount, setBookCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);

    const activeMembers = [
        { name: 'John Doe', borrowCount: 15 },
        { name: 'Jane Smith', borrowCount: 12 },
        { name: 'Bob Johnson', borrowCount: 10 },
        { name: 'Alice Brown', borrowCount: 9 },
    ];

    const bookCategories = [
        { name: 'Fiction', value: 450 },
        { name: 'Non-Fiction', value: 300 },
        { name: 'Science', value: 200 },
        { name: 'Technology', value: 100 },
        { name: 'Arts', value: 50 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699'];

    const monthlyData = [
        { month: 'Jan', borrowed: 124, returned: 98, newMembers: 45 },
        { month: 'Feb', borrowed: 145, returned: 125, newMembers: 38 },
        { month: 'Mar', borrowed: 165, returned: 140, newMembers: 52 },
        { month: 'Apr', borrowed: 155, returned: 149, newMembers: 41 },
        { month: 'May', borrowed: 178, returned: 158, newMembers: 35 },
        { month: 'Jun', borrowed: 190, returned: 175, newMembers: 48 },
    ];


    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBookCount(storedBooks.length);

        const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
        setMemberCount(storedMembers.length);
    }, []);


    return (
        <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">

                {/* Bar Chart */}
                <BarChart data={activeMembers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="borrowCount" fill="#0d6efd" />
                </BarChart>


                {/* Pie Chart */}
                <PieChart>
                    <Pie data={bookCategories} cx="50%" cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120} fill="#8884d8" dataKey="value">
                        {bookCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>


                {/* Line Chart */}
                <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"
                        dataKey="newMembers"
                        stroke="#198754"
                        name="New Members"
                    />
                </LineChart>


                {/* Area Chart */}
                <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="borrowed" stackId="1"
                        stroke="#0d6efd" fill="#0d6efd" name="Borrowed"
                    />
                    <Area type="monotone" dataKey="returned" stackId="1"
                        stroke="#198754" fill="#198754" name="Returned"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );



    // return (
    //     <div className="p-8 flex flex-col items-center justify-center">
    //         <h1 className="text-3xl font-bold text-center mb-24 mt-5">Welcome to Book Management System!</h1>
    //         <div className="grid md:grid-cols-2 gap-8">
    //             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
    //                 <h2 className="text-2xl font-semibold mb-2">Book Collection Stats</h2>
    //                 <p className="text-lg">
    //                     <span className="font-bold">{bookCount}</span> {bookCount === 1 ? "book" : "books"} in your collection.
    //                 </p>
    //             </div>
    //             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
    //                 <h2 className="text-2xl font-semibold mb-2">Member Collection Stats</h2>
    //                 <p className="text-lg">
    //                     <span className="font-bold">{memberCount}</span> {memberCount === 1 ? "member" : "members"} in your collection.
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default DashboardPage;
