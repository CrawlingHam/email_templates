import VerificationTemplate from "../base-templates";

export default function PasswordReset() {
    return (
        <VerificationTemplate
            previewText="Password Reset"
            subHeader="Hi {{USER_NAME}},"
            header="Reset Your Password"
            description="Looks like you forgot your password! To reset your password simply open this link below in your browser. 
            If you did not request this password reset link, you can ignore this message."
            buttonText="Reset Password"
        />
    );
}
