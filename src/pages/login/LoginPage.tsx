import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form, Image, Input, message, Tabs } from "antd";
import { useStores } from "../../provider/MobxProvider";
import Title from "antd/es/typography/Title";
import authService from "../../service/AuthService";
import { AxiosError } from "axios";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as signalR from '@microsoft/signalr';


const LoginPage = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [tabKey, setTabKey] = useState("local");
    const [qrCode, setQrCode] = useState<string | null>(null);

    const [guid, setGuid] = useState<string | null>(null);

    const { authStore } = useStores()

    const onFinish = async (values: { email: string, password: string }) => {
        setLoading(true);
        try {
            authService.login(values.email, values.password).then(() => {
                setLoading(false)
                navigate('/verify-email-code/' + values.email)
            }).catch(e => {
                if (e instanceof AxiosError) {
                    switch (e.status) {
                        case 404:
                            message.error("Пользователь не найден")
                            break;
                        case 401:
                            message.error("Неверный пароль")
                            break;
                        default:
                            message.error("Непредвиденная ошибка, попробуйте позже")
                            break;
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tabKey === 'qr') {
            authService.getQrCode().then(res => {
                setGuid(res.headers['x-guid'])
                const blob = new Blob([res.data], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                setQrCode(url);
            })
        }
    }, [tabKey])


    useEffect(() => {
        if (guid) {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_APP_API_URL}/qrlink?guid=${guid}`)
                .withAutomaticReconnect()
                .build();

            connection.on("QrLoginSuccess", (data) => {
                message.success("Вы успешно вошли в систему");
                authStore.setAuth(true)
                authStore.setUser(data.user)
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                navigate('/')
            });

            connection.start().then(() => {
                console.log("✅ SignalR подключён");
            })
                .catch((err) => {
                    console.error("❌ Ошибка подключения SignalR:", err);
                });;

            return () => {
                connection.stop();
            };
        }
    }, [guid]);



    return (
        <>
            <Title level={2}>Вход</Title>

            <Tabs
                onChange={(key) => setTabKey(key)}
                activeKey={tabKey}
                items={[
                    {
                        key: 'local',
                        label: "Войти через пароль",
                        children: <>
                            <Card style={{ maxWidth: 500 }}>
                                <Form
                                    name="login"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Пожалуйста, введите Email!' }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Email"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} block>
                                            Войти
                                        </Button>
                                    </Form.Item>

                                    <Form.Item>
                                        Если у вас нет аккаунта, <Link to="/registration">зарегистрируйтесь</Link>
                                    </Form.Item>

                                </Form>
                            </Card>
                        </>
                    },
                    {
                        key: 'qr',
                        label: "Войти через QR-код",
                        children: <>
                            <p>
                                Пожалуйста отсканируйте QR-код с помощью приложения TFA
                            </p>

                            {qrCode && <Image src={qrCode} width={300} />}
                        </>
                    }
                ]}
            />


        </>
    );
};

export default LoginPage;