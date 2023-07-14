import { Descriptions, Image, Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import { getUserDetailAPI } from "api/user";
import { UserData } from "core/interface/models";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "store";

function UserDetail() {
  const location = useLocation();
  const username: any = store.getState().user.username;
  const fetchUser = async () => {
    const res = await getUserDetailAPI(username);
    const data = res.data;
    return data;
  };
  const { isSuccess, isError, error, data } = useQuery<UserData, Error>(
    ["user"],
    async () => fetchUser()
  );

  useEffect(() => {}, [username]);

  const avatarUrl = data?.user_db.avatar?.url;
  if (isSuccess) {
    toast.success("Success");
    toast.clearWaitingQueue();
  }

  if (isError) {
    toast.error(error?.message);
    toast.clearWaitingQueue();
  }

  console.log(data?.user_db.avatar);

  return (
    <Layout style={{ padding: 8, background: "#eee", marginTop: "12px" }}>
      <div style={{ padding: 8, background: "#fff" }}>
        <div
          style={{
            padding: "12px 8px",
            background: "#EEEEEE",
            display: "flex",
            alignItems: "center",
            paddingLeft: 4,
            fontSize: 16,
            fontWeight: "500",
            justifyContent: "center",
          }}
        >
          User Info
        </div>
        <div style={{ padding: 8, background: "#eee" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 52px",
              }}
            >
              <Image
                width={200}
                src={`${avatarUrl}`}
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Descriptions layout="horizontal">
                <Descriptions.Item label="First Name">
                  {data?.user_db.firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {data?.user_db.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {data?.user_db.email}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {data?.user_db.gender}
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  {data?.user_db.city}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {data?.user_db.address}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserDetail;
