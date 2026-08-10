
export const StatCard = ({ title, value, trend, color }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">

            {/* Title */}
            <p className="text-sm text-gray-500">{title}</p>

            {/* Value */}
            <h2 className="text-2xl font-bold mt-2">{value}</h2>

            {/* Trend */}
            <div className="flex items-center mt-3">
                <span className={`text-sm font-semibold ${color}`}>
                    {trend}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                    vs last month
                </span>
            </div>

        </div>
    );
};