import VerificationTemplate from "../base-templates";

export default function SignupVerification() {
    return (
        <VerificationTemplate
            subHeader="Welcome to {{APP_NAME}}"
            header="Verify Your Email Address"
            description="We are excited to have you on board! To complete your registration, please verify your email address by clicking the button below. If you did
                not request this verification link, you can ignore this message."
            buttonText="Verify Email Address"
        />
    );
}
