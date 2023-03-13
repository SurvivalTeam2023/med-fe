import { Descriptions } from "antd";
import { getUserDetailAPI } from "api/user";
import { UserData } from "core/interface/models";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function UserDetail() {
    const location = useLocation();
    const username = location.state
    const fetchUser = async () => {
        const res = await getUserDetailAPI(username)
        const data = res.data
        return data
    }
    const {
        isSuccess,
        isError,
        error,
        data,
    } = useQuery<UserData, Error>(['user'], async () => fetchUser())

    if (isSuccess) {
        toast.success("Success")
        toast.clearWaitingQueue()
    }

    if (isError) {
        toast.error(error?.message)
        toast.clearWaitingQueue()
    }

    return (
        <Descriptions title="User Info" layout="vertical" bordered>
            <Descriptions.Item label="First Name">{data?.user_db.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{data?.user_db.lastName}</Descriptions.Item>
            <Descriptions.Item label="Email">{data?.user_db.email}</Descriptions.Item>
            <Descriptions.Item label="Gender">{data?.user_db.gender}</Descriptions.Item>
            <Descriptions.Item label="City">{data?.user_db.city}</Descriptions.Item>
            <Descriptions.Item label="Address">{data?.user_db.address}</Descriptions.Item>
        </Descriptions >
    );

}
export default UserDetail;
