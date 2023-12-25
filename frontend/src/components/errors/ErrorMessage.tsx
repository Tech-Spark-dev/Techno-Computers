import React from "react";
import { Alert } from "react-bootstrap";

type ErrorTypes = {
    variant?: string,
    children: React.ReactNode
}
const ErrorMessage = ({ variant = "info", children }: ErrorTypes) => {
    return (
        <Alert variant={variant} style={{ fontSize: 20 }}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage;