# Email Templates

A React-based email template system for sending emails, built with [@react-email/components](https://react.email/). This project provides reusable email templates that can be customized and deployed for sending transactional emails.

## 📁 Project Structure

```
email/
├── base-templates/          # Core template components and styling
│   ├── constants.ts         # Shared constants (logos, URLs)
│   ├── index.tsx           # Main verification template component
│   └── styling.ts          # Email styling definitions
├── emails/                 # React Email export directory. Used to export to static html files
│   └── signupVerification.tsx
├── templates/              # Main template files
│   └── signupVerification.tsx
├── package.json
└── README.md
```

**Note:** The `emails/` directory contains simple re-exports for React Email's build system, while `templates/` contains the actual template logic that gets version controlled.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

To preview and test your email templates locally:

```bash
pnpm dev
```

This will start the React Email development server where you can preview your templates in the browser.

## 📧 Available Templates

### Signup Verification Email

Located in `emails/signupVerification.tsx`, this template is used for email verification during user registration.

**Features:**

-   Responsive design
-   MyCompany branding with logo
-   Gradient button styling
-   Privacy policy link
-   Footer with copyright information

## 🔧 Template Variables

The templates use placeholder variables that need to be replaced with actual data before sending. These are denoted with double curly braces `{{VARIABLE_NAME}}`.

### Common Variables

| Variable                  | Description             | Example                                   |
| ------------------------- | ----------------------- | ----------------------------------------- |
| `{{APP_NAME}}`            | Your application's name | "MyCompany"                               |
| `{{VERIFICATION_LINK}}`   | Email verification URL  | "https://yourapp.com/verify?token=abc123" |
| `{{PRIVACY_POLICY_LINK}}` | Privacy policy URL      | "https://yourapp.com/privacy"             |

### How to Replace Variables

Before using the template in your email service, you'll need to replace these placeholders with actual data:

```javascript
// Example: Replace template variables
const template = getTemplate(); // Get your compiled template through GET request or path to static file
const personalizedTemplate = template
    .replace("{{APP_NAME}}", "MyCompany")
    .replace("{{VERIFICATION_LINK}}", "https://MyCompany.com/verify?token=abc123")
    .replace("{{PRIVACY_POLICY_LINK}}", "https://MyCompany.com/privacy");
```

## 🚀 Deployment Recommendations

### AWS Deployment (Recommended)

For production use, we recommend deploying the compiled templates to AWS S3 and serving them through CloudFront:

#### 1. Build the Templates

```bash
pnpm export
```

This creates an `out` folder with static HTML files.

#### 2. Deploy to S3

```bash
# Upload the out folder to your S3 bucket
aws s3 sync out/ s3://your-email-templates-bucket/

# Or deploy through a CDK stack
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Stack, StackProps, CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { join } from "path";

export class EmailTemplatesStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket: Bucket = new Bucket(this, "EmailTemplateAssetsBucket", {
            bucketName: `my-app-email-assets-${this.account}-${this.region}`,
            removalPolicy: RemovalPolicy.DESTROY, // Automatically delete bucket on stack deletion (for dev/test)
            autoDeleteObjects: true, // Automatically delete objects when bucket is destroyed (for dev/test)
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            publicReadAccess: false, // Served through Cloudfront
        });

        const distribution = new Distribution(this, "EmailAssetsDistribution", {
            defaultBehavior: {
                // @ts-ignore - S3Origin is deprecated but still functional
                origin: new S3Origin(bucket),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: "index.html",
        });

        new CfnOutput(this, "EmailAssetsBucketName", {
            description: "Name of the S3 bucket for email assets",
            value: bucket.bucketName,
        });

        new BucketDeployment(this, "EmailAssetsDeployment", {
            sources: [Source.asset(join(__dirname, "../../../../templates/email/out"))], # Replace with actual path to the out directory
            destinationBucket: bucket,
            destinationKeyPrefix: "templates",
        });

        new CfnOutput(this, "EmailAssetsCloudFrontUrl", {
            description: "CloudFront URL for email assets",
            value: `https://${distribution.distributionDomainName}`,
        });
    }
}

```

#### 3. Configure CloudFront

-   Create a CloudFront distribution pointing to your S3 bucket
-   Configure caching settings for optimal performance
-   Set up custom domain (optional but recommended)

#### 4. Usage in Your Application

```javascript
// Fetch template from CloudFront
const response = await fetch("https://your-cloudfront-domain.com/templates/signupVerification.html");
const template = await response.text();

// Replace variables with actual data
const personalizedTemplate = template
    .replace("{{APP_NAME}}", "MyCompany")
    .replace("{{VERIFICATION_LINK}}", verificationUrl)
    .replace("{{PRIVACY_POLICY_LINK}}", privacyPolicyUrl);

// Use with your email service (SES, SendGrid, etc.)
await emailService.send({
    to: userEmail,
    subject: "Verify Your Email Address",
    html: personalizedTemplate,
});
```

### Alternative Deployment Options

-   **Vercel**: Deploy as a static site
-   **Netlify**: Upload the `out` folder
-   **GitHub Pages**: Host templates directly from your repository

## 🎨 Customization

### Adding New Templates

1. Create a new file in the `emails/` directory
2. Import and use the base template components
3. Customize the content and styling as needed

Example:

```tsx
import VerificationTemplate from "../base-templates";

export default function PasswordReset() {
    return (
        <VerificationTemplate
            subHeader="Password Reset Request"
            header="Reset Your Password"
            description="You requested a password reset. Click the button below to create a new password."
            buttonText="Reset Password"
        />
    );
}
```

### Styling Customization

Edit `base-templates/styling.ts` to modify:

-   Colors and gradients
-   Typography
-   Spacing and layout
-   Button styles

### Logo and Branding

Update `base-templates/constants.ts` to change:

-   Logo URLs for different themes
-   Brand colors
-   Company information

## 🔍 Troubleshooting

### Common Issues

-   **Images not loading**: Ensure logo URLs are publicly accessible
-   **Styling issues**: Some email clients strip CSS, use inline styles
-   **Variable replacement**: Double-check variable names match exactly

### Email Client Compatibility

The templates use React Email components with inline CSS for broad compatibility. Testing is recommended for your specific use case:

-   ✅ Gmail (web and mobile) - Good compatibility
-   ✅ Outlook (web, desktop, mobile) - Generally good, some CSS limitations
-   ✅ Apple Mail - Good compatibility
-   ⚠️ Yahoo Mail - May have some styling issues
-   ⚠️ Thunderbird - Limited testing data

**Note:** Email client rendering can vary significantly. Always test your specific templates before production use.

## 📄 License

This project is free to use and modify. See [LICENSE](LICENSE) for full details.

## 🤝 Contributing

When adding new templates or modifying existing ones:

1. Test thoroughly across email clients
2. Update this README with new variables or features
3. Ensure responsive design works on mobile devices
4. Follow the existing code style and patterns
