import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart3,
    Settings,
    Search,
    Bell,
    Menu
} from "lucide-react";
import { useState } from "react";
import { StatCard } from "./StatCard";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
        { label: "Analytics", icon: <BarChart3 size={20} /> },
        { label: "Orders", icon: <ShoppingCart size={20} /> },
        { label: "Settings", icon: <Settings size={20} /> },
    ];

    const statsData = [
        { title: "Total Revenue", value: "$45,231", trend: "+20.1%", color: "text-emerald-600" },
        { title: "Active Users", value: "2,350", trend: "+180.1%", color: "text-blue-600" },
        { title: "Sales", value: "+12,234", trend: "+19%", color: "text-orange-600" },
        { title: "Active Now", value: "+573", trend: "+201", color: "text-purple-600" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 overflow-hidden">

            {/* MOBILE SIDEBAR */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex ">
                    <div className="md:w-[30%] w-[40%] min-w-50 bg-slate-900 text-white p-4">
                        <h2 className="text-xl font-bold text-emerald-400 mb-4">Rahid Malik</h2>
                        {menuItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
                                {item.icon}
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* overlay */}
                    <div
                        className="flex-1 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* DESKTOP SIDEBAR */}
            {/* Added shrink-0 so the sidebar doesn't shrink when main content gets wider */}
            <aside className="w-64 bg-slate-900 text-white hidden flex-col shrink-0">
                <div className="p-6 text-2xl font-bold text-emerald-400">
                    Rahid Malik
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${item.active
                                ? "bg-emerald-500 text-white"
                                : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* MAIN */}
            {/* ADDED min-w-0 HERE: This prevents the Flex Blowout issue */}
            <main className="flex flex-1 flex-col min-w-0">

                {/* NAVBAR */}
                <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-4 sm:px-6 md:px-8 shrink-0">

                    {/* LEFT */}
                    <div className="flex items-center gap-3 w-full">

                        {/* MENU BUTTON (mobile only) */}
                        <button
                            className="flex"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        {/* SEARCH */}
                        <div className="relative w-full sm:w-64 md:w-80 lg:w-96">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                            <Bell size={20} />
                        </button>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                            RM
                        </div>
                    </div>
                </header>

                {/* CONTENT */}
                {/* Added overflow-y-auto here so the page content scrolls properly, not the whole window */}
                <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                        Overview
                    </h1>

                    {/* FIXED GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statsData.map((item, index) => (
                            <StatCard key={index} {...item} />
                        ))}
                    </div>

                    {/* Table Section */}
                    {/* Moved Table inside the padded content div so it doesn't touch screen edges */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                        <div className="p-6 border-b border-gray-300">
                            <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                        </div>

                        <div className="overflow-x-auto w-full custom-scrollbar">
                            <table className="w-full text-left min-w-175">
                                <thead className="bg-gray-50 text-gray-500 text-sm">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Customer</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <TableRow
                                        name="Ali Hamza"
                                        status="Completed"
                                        date="Apr 09, 2026"
                                        amount="$250.00" />
                                    <TableRow
                                        name="Sarah Khan"
                                        status="Processing"
                                        date="Apr 08, 2026"
                                        amount="$1,200.00" />
                                    <TableRow
                                        name="John Doe"
                                        status="Pending"
                                        date="Apr 07, 2026"
                                        amount="$45.00" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const TableRow = ({ name, status, date, amount }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-medium text-gray-900">{name}</td>
        <td className="px-6 py-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${status === 'Completed' ? 'bg-green-100 text-green-700' :
                status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                {status}
            </span>
        </td>
        <td className="px-6 py-4 text-gray-500 text-sm">{date}</td>
        <td className="px-6 py-4 font-semibold text-gray-900">{amount}</td>
    </tr>
);

export default Dashboard;