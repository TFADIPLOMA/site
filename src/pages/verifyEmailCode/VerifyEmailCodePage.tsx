import { Button, Card, Flex, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../service/AuthService";
import { useState } from "react";
import { useStores } from "../../provider/MobxProvider";

const VerifyEmailCodePage = () => {
    const { email } = useParams()
    const navigate = useNavigate()

    const [code, setCode] = useState<string>('')
    const {authStore} = useStores()

    const handleSendVerifyCode = () => {
        authService.verifyEmailCode({ email: email as string, code }).then((data)=>{
            authStore.setAuth(true)
            authStore.setUser(data.user)
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            navigate('/')
        }).catch(()=>{message.error('Неверный код')}    )
    }

    return (
        <>
            <Title level={2}>Двухфакторная аутентификация</Title>

            <Card style={{ maxWidth: 400 }}>
                <p>На вашу почту <b>{email}</b> отправлен временный код. Для продолжения авторизации пожалуйста введите код</p>

                <Form.Item label="Временный код" rules={[{ required: true, message: 'Введите код' }]}>
                    <Input placeholder="Введите код" onChange={e => setCode(e.target.value)} />
                </Form.Item>
                <Flex justify="flex-end">
                    <Button type="primary" size="large" onClick={handleSendVerifyCode}>Отправить</Button>

                </Flex>

            </Card>

        </>
    );
};

export default VerifyEmailCodePage;