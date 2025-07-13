import VerificationTemplate from "../base-templates";

export default function EmailUpdate() {
    return (
        <VerificationTemplate
            previewText="Email Update"
            subHeader="Hi {{USER_NAME}},"
            header="Update Your Email"
            description="Someone has requested to update your email address. To update your email address simply open this link below in your browser. 
            If you did not request this email update link, you can ignore this message."
            buttonText="Update Email"
        />
    );
}
