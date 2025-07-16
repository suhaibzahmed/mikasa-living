import {
  Users,
  Store,
  Hourglass,
  IndianRupee,
  ShieldCheck,
  Users2,
  Megaphone,
} from 'lucide-react'
import ManagementCard from '../_components/dashboard/ManagementCard'
import PendingVendors from '../_components/dashboard/PendingVendors'
import RecentUsers from '../_components/dashboard/RecentUsers'
import StatCard from '../_components/dashboard/StatCard'

const AdminDashboardPage = () => {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,234" icon={Users} />
        <StatCard title="Total Vendors" value="56" icon={Store} />
        <StatCard title="Pending Approvals" value="12" icon={Hourglass} />
        <StatCard title="Total Revenue" value="₹1,23,456" icon={IndianRupee} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ManagementCard
          title="Vendor Management"
          href="/admin/vendor-management"
          icon={ShieldCheck}
        />
        <ManagementCard
          title="User Management"
          href="/admin/user-management"
          icon={Users2}
        />
        <ManagementCard
          title="Ad Management"
          href="/admin/ad-management"
          icon={Megaphone}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <PendingVendors />
        </div>
        <div className="lg:col-span-2">
          <RecentUsers />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
