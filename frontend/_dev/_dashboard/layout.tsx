import UserAnalytics from "UserAnalytics";
import RevenueMetrics from "RevenueMetrics";
import Notifications from "Notifications";
export default function DashboardLayout({
    children,
    users,
    revenue,
    notifications,

}: {
    children: React.ReactNode;
    users: React.ReactNode;
    revenue: React.ReactNode;
    notifications: React.ReactNode;
    
}) {
    return (
        <>
            <div>
                {children}
            </div>
            <UserAnalytics />
            <RevenueMetrics />
            <Notifications />
        </>
    );
}
