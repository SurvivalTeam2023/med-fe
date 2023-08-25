import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import PlayIcon from '@heroicons/react/24/outline/PlayIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useTotalActiveUsers } from './components/TotalActiveUsers'
import { useTotalNewUser } from './components/TotalNewUser'
import { useTotalSubscribeUsers } from './components/TotalSubscribeUser'
import { useTotalAudio } from './components/TotalAudio'






function Dashboard() {


    const dispatch = useDispatch()

    const { totalActiveUsers } = useTotalActiveUsers();
    const { totalNewUser } = useTotalNewUser();
    const { totalSubscribeUser } = useTotalSubscribeUsers();
    const { totalAudio } = useTotalAudio();





    const statsData = [
        { title: "Total Active Users", value: totalActiveUsers, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "New User this month", value: totalNewUser, icon: <UsersIcon className='w-8 h-8' />, description: "Current month" },
        { title: "Total User Subscribe", value: totalSubscribeUser, icon: <CreditCardIcon className='w-8 h-8' />, description: "50 in hot leads" },
        { title: "Total Audio", value: totalAudio, icon: <PlayIcon className='w-8 h-8' />, description: "" },
    ]

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>



            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>

  

            

            {/** ---------------------- User source channels table  ------------------------- */}

            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div>
        </>
    )
}

export default Dashboard