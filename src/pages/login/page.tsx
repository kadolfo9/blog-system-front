import { LoginFormSchema, PFormState } from "@/lib/definitions";
import { Alert, Box, Button, Container, TextField } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react"
import { Form, useNavigate } from "react-router"

import './styles/index.css';
import AuthContext from "@/context/auth";
import { AuthPayloadInput } from "@/services/auth";

function Login() {
    const [message, setMessage] = useState<PFormState>({
        email: [],
        password: []
    });
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        setMessage({ email: [], password: [] });

        const payload = {
            email: email.current?.value,
            password: password.current?.value
        };

        const schema = LoginFormSchema.safeParse(payload);

        if (!schema.success) {
            setMessage(schema.error.flatten().fieldErrors);
            return;
        }

        context.handleAuth(payload as AuthPayloadInput)
        .then((response) => {
            if (response.token && typeof response.token === 'string') {
                navigate('/dashboard');
                return;
            }
        }).catch((reason) => {
            if (reason.email) {
                setMessage({ email: [reason.email], password: [] });
                return;
            }
        })

        
    }

    function getError(error: 'email' | 'password') {
        return message?.[error]?.[0] && typeof message[error] === 'object' ? (
            <Alert severity="error" className="alert">
                {message[error][0]}
            </Alert>
        ) : null;
    }

    return (
        <>
            <Container maxWidth="sm">
                <Form method="post" onSubmit={onSubmit}>
                    {getError('email')}
                    {getError('password')}

                    <Box component="section" className="form-box">
                        <h2 className="login-text">
                            Login
                        </h2>

                        <p>
                            <TextField inputRef={email} label="E-mail" variant="standard" type="email" fullWidth></TextField>
                            <TextField inputRef={password} label="Password" variant="standard" type="password" fullWidth className="password-field"></TextField>
                        </p>
                        
                        <p>
                            <Button variant="contained" className="submit-button" type="submit">Login</Button>
                        </p>
                        
                        <a href="#" className="forgot-button">Esqueceu sua senha?</a>
                    </Box>
                </Form>
            </Container>
        </>
    )
}

export default Login