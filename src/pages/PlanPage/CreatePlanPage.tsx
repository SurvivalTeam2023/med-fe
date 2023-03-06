import { Button, Form, Input, InputNumber } from "antd";
import { createPlanAPI } from "api/plan";
import { newPlan } from "core/interface/models/plan";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { PLAN } from "../../core/constant/routes";



function CreatePlanPage() {
    const navigate = useNavigate();
    const createPlan = async (payload: newPlan) => {
        await createPlanAPI(payload)
    }
    const mutation = useMutation({
        mutationFn: (payload: newPlan) => createPlan(payload),
    });
    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        await toast.promise(
            mutation.mutateAsync({ name: values['name'], desc: values['desc'], usageTime: values['usageTime'], cost: values['cost'] }),
            {
                pending: {
                    render() {
                        return "Loading...";
                    },
                },
                success: {
                    render({ data }) {
                        return "Create successfully";
                    },
                    // other options
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `${data}`;
                    },
                },
            }
        )
        setTimeout(() => {
            navigate(PLAN);
        }, 1000);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '5%' }}>
                <Form form={form}
                    name="plan-form"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 15 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Plan Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input plan name !' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Plan Description"
                        name="desc"
                        rules={[{ required: true, message: 'Please input plan description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="cost"
                        rules={[{ required: true, message: 'Please input price!' }]}

                    >
                        <InputNumber prefix="$" />
                    </Form.Item>

                    <Form.Item
                        label="Months">
                        <Form.Item name="usageTime" noStyle rules={[{ required: true, message: 'Please input number of month' }]} >
                            <InputNumber min={1} max={12} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Create Plan
                        </Button>
                    </Form.Item>
                </Form >
            </div >
            <ToastContainer autoClose={1000} limit={1} />
        </>
    )
}
export default CreatePlanPage;