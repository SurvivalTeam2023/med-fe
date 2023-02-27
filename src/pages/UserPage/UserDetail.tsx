import { Descriptions } from "antd";
import { getUserDetailAPI } from "api/user";
import { UserData } from "core/interface/models";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

function UserDetail() {
    const location = useLocation();
    const username = location.state
    const fetchUser = async () => {
        const res = await getUserDetailAPI(username)
        const data = res.data
        return data
    }
    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery<UserData, Error>(['user'], async () => fetchUser())
    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
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
