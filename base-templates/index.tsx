import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text, Button, Hr } from "@react-email/components";
import { main, container, logoContainer, logo, h1, text, button, link, hr, footer } from "./styling";
import { logoUrl } from "./constants";

type VerificationTemplateProps = {
    footerText?: string;
    description: string;
    buttonText: string;
    previewText: string;
    subHeader?: string;
    header: string;
};

const VerificationTemplate = ({ previewText, subHeader, header, description, buttonText, footerText }: VerificationTemplateProps) => (
    <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={main}>
            <Container style={container}>
                <div style={logoContainer("dark")}>
                    <Img src={logoUrl("dark")} width="40%" height="40%" alt="{{APP_NAME}} Logo" style={logo} />
                </div>

                <Heading style={h1}>{header}</Heading>

                {subHeader && <Text style={text}>{subHeader}</Text>}

                <Text style={text}>{description}</Text>

                <Button href="{{VERIFICATION_LINK}}" style={button}>
                    {buttonText}
                </Button>

                <Hr style={hr} />

                <Text style={footer}>
                    © {new Date().getFullYear()}, {"{{APP_NAME}}"}, Inc. All rights reserved.{footerText && ` ${footerText}`}
                </Text>

                <Text style={footer}>
                    <Link href="{{PRIVACY_POLICY_LINK}}" target="_blank" style={{ ...link, color: "#898989" }}>
                        View our privacy policy
                    </Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

export default VerificationTemplate;
