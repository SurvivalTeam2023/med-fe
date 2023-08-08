import { useQuery } from "react-query";
import { useState } from "react";
import {
  PaginationProps,
  Table,
  Button,
  Layout,
  Menu,
  theme,
  MenuProps,
  Modal,
} from "antd";
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
import { getTrackByPlaylistIdAPI } from "api/playlistTracks";
import { TracksData } from "core/interface/models/track";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "store";
import { useDispatch } from "react-redux";
import { audioActions } from "store/slice/audio.slice";
import { getSubscriptionAPI } from "api/subscription";
import { Subscription } from "core/interface/models/subscription";
import { DeleteOutlined } from "@ant-design/icons";
function SubscriptionPage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const fetchSubscriptions = async () => {
    const res = await getSubscriptionAPI();
    const data = res.data;
    return data;
  };

  const navigate = useNavigate();

  const { isSuccess, isError, error, data } = useQuery<Subscription, Error>(
    ["subscription", page],
    () => fetchSubscriptions()
  );

  if (isSuccess) {
    toast.success("Success");
    toast.clearWaitingQueue();
  }

  if (isError) {
    toast.error(error?.message);
    toast.clearWaitingQueue();
  }
  const onChange: PaginationProps["onChange"] = (current) => {
    setPage(current);
  };
  data?.items.map((subscription) => {
    // let createdAt = moment(new Date(subscription.createdAt));
    // let endDate = moment(new Date(subscription.endDate));
    subscription.endDate = moment(subscription.endDate).format("DD/MM/YYYY");
    // subscription.createdAt = createdAt.calendar();
    subscription.createdAt = moment(subscription.createdAt).format(
      "DD/MM/YYYY"
    );
  });

  return (
    <div>
      <Layout style={{ padding: 8, background: "#eee" }}>
        <div style={{ padding: 8, background: "#fff", width: "100%" }}>
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
            Mange Subscription
          </div>
          <Table
            className="audio-table"
            dataSource={data?.items}
            showSorterTooltip={true}
            pagination={{
              total: data?.meta.totalItems,
              current: page,
              onChange: onChange,
              position: ["bottomCenter"],
            }}
            columns={[
              { title: "id", dataIndex: "id", key: "id", width: "30%" },
              {
                title: "Plan",
                dataIndex: ["plan", "name"],
                key: "plan",
                width: "30%",
              },
              {
                title: "Plan price",
                dataIndex: ["plan", "cost"],
                key: "plan",
                width: "10%",
              },
              {
                title: "User",
                dataIndex: ["user", "username"],
                key: "user",
                width: "20%",
              },
              {
                title: "Email",
                dataIndex: ["user", "email"],
                key: "email",
                width: "20%",
              },

              {
                title: "Created Date",
                dataIndex: "createdAt",
                key: "createdAt",
                width: "80%",
                defaultSortOrder: "ascend",
              },
              {
                title: "Expired Date",
                dataIndex: "endDate",
                key: "endDate",
                width: "20%",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                width: "20%",
                render: (text) => (
                  <p
                    style={{
                      backgroundColor:
                        text === "EXPIRED" ? "#F30F10" : "#00BA28",
                      color: "white",
                      borderRadius: "5px",
                      fontWeight: "500",
                      fontSize: "12px",
                      padding: "4px",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {text}
                  </p>
                ),
              },
              {
                title: "Action",
                key: "action",
                render: (text, record, index) => <DeleteOutlined />,
                width: "20%",
              },
            ]}
          />
        </div>
      </Layout>
    </div>
  );
}
export default SubscriptionPage;
