import { Button, Card, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationRequest } from "../../types/auth/RegistrationRequest";
import authService from "../../service/AuthService";
import { AxiosError } from "axios";
import Title from "antd/es/typography/Title";

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const onFinish = async (values: RegistrationRequest) => {
        setLoading(true);
        try {
            authService.register(values).then(() => {
                navigate('/login')
            }).catch(e => {
                if (e instanceof AxiosError) {
                    switch (e.status) {
                        case 409:
                            message.error("Пользователь с таким email уже зарегистрирован")
                            break;
                        default:
                            message.error("Непредвиденная ошибка, попробуйте позже")
                            break;
                    }
                }
            })
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
  return (
    <>
    <Title level={2}>Регистрация</Title>
            
           <Card style={{ maxWidth: 400 }}>
           <Form
                form={form}
                name="registration"
                initialValues={new RegistrationRequest()}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш Email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                >
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
                >
                    <Input placeholder="Имя" />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Пожалуйста, введите вашу фамилию!' }]}
                >
                    <Input placeholder="Фамилия" />
                </Form.Item>
              
               
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
                <Form.Item>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </Form.Item>
            </Form>
           </Card>

    </>
  );
};

export default RegistrationPage;