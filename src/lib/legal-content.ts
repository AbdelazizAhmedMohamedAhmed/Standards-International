import { companyContact } from "./site-content";

export type LegalDocument = {
  title: string;
  description: string;
  updated: string;
  sections: { title: string; paragraphs: string[] }[];
};

export const termsOfUse: LegalDocument = {
  title: "Website Terms of Use",
  description:
    "Terms for using the Standards website and requesting information about trade services.",
  updated: "6 November 2026",
  sections: [
    {
      title: "About these terms",
      paragraphs: [
        "These terms govern use of the Standards for International Trade website. Standards is based in Cairo, Egypt. They describe website use; any purchase, supply, sourcing mandate, agency arrangement or other commercial engagement requires a separate agreement between the relevant parties.",
        `For questions about these terms, contact ${companyContact.generalEmail}. If you do not agree with these terms, do not use the website or its agent tools. Mandatory legal rights continue to apply.`,
      ],
    },
    {
      title: "Information, inquiries and commercial agreements",
      paragraphs: [
        "Website content describes potential services and areas of focus. It is not a binding quotation, offer to supply, guarantee of availability, or acceptance of an order. Prices, specifications, minimum quantities, lead times, quality requirements, inspection arrangements, Incoterms, payment terms and responsibilities must be confirmed in writing for each engagement.",
        "Sending an inquiry, using a checklist, or asking an agent tool a question does not establish an agency, partnership or contractual relationship, reserve goods, or authorize anyone to incur costs on your behalf. Online inquiry checklists currently do not send or upload information. Use the published sales email to contact the business.",
        "Do not rely on website information as legal, customs, tax, financial, engineering or product-safety advice. Obtain qualified advice and verify requirements for the product, destination and transaction.",
      ],
    },
    {
      title: "Your responsibilities and acceptable use",
      paragraphs: [
        "Provide accurate information and contact the business only on behalf of yourself or an organization you are authorized to represent. You are responsible for the rights to information and documents you send. Do not send unlawful content, malware, credentials, payment-card details, or unnecessary sensitive personal information.",
        "Do not misuse the website, bypass security controls, interfere with availability, harvest personal information, impersonate the business, or use the site or its tools for fraud, spam or unlawful trade. Applicable sanctions, export controls, import rules and anti-bribery requirements must be assessed for each transaction.",
      ],
    },
    {
      title: "Intellectual property and automated access",
      paragraphs: [
        "Standards branding and original content remain the property of their respective rights holders. Photographs, video and other third-party material may have separate licenses and attribution requirements, described on the Credits page. Website access does not transfer ownership or grant a general right to reproduce third-party media.",
        "Public crawlers and tools should respect robots.txt, the declared Content-Signal policy, applicable licenses and reasonable request rates. The site permits search use and declares ai-train=no. These technical signals express usage preferences; they do not replace applicable law or grant rights the business does not own.",
        "Public MCP and browser tools return information only. They cannot place orders, send email, bind the business, upload documents or reveal private inquiries. Verify important information with the business before making a commercial decision.",
      ],
    },
    {
      title: "Availability, external services and security",
      paragraphs: [
        "Reasonable care is taken with the website, but content may be incomplete or out of date and access may be interrupted. No promise is made that the site, external links, tools or third-party services will always be available, accurate, secure or error-free. Check information before relying on it.",
        "External websites and services have their own terms and privacy practices. Linking to them does not mean that Standards controls or endorses all their content. Email is not a guaranteed confidential channel; agree a suitable method before sending confidential commercial material.",
      ],
    },
    {
      title: "Liability and mandatory rights",
      paragraphs: [
        "To the extent permitted by applicable law, Standards is not responsible for indirect or consequential loss arising solely from use of, or inability to use, this informational website, including loss caused by reliance on unconfirmed website information or independent third-party services.",
        "Nothing in these terms excludes or limits liability for fraud, intentional misconduct, or any liability or statutory right that cannot lawfully be excluded or limited. Separate signed commercial agreements govern transaction-specific warranties, remedies and liability.",
      ],
    },
    {
      title: "Applicable law, questions and updates",
      paragraphs: [
        "These website terms are intended to be interpreted under applicable Egyptian law, subject to mandatory rules and rights that may apply in another jurisdiction. A separate commercial agreement may set different transaction-specific governing-law and dispute terms.",
        `Raise concerns first by contacting ${companyContact.generalEmail}. These terms may be updated as the website or services change. The date above identifies the current version; changes do not retrospectively replace a separately agreed commercial contract.`,
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How information is handled when you visit Standards or contact the business by email.",
  updated: "6 November 2026",
  sections: [
    {
      title: "Who to contact",
      paragraphs: [
        `This notice concerns the Standards for International Trade website and business inquiries. The published business location is ${companyContact.location}. Contact ${companyContact.generalEmail} for privacy questions or requests concerning personal information.`,
      ],
    },
    {
      title: "Information you choose to provide",
      paragraphs: [
        "When you email the business, your message may include your name, business contact details, company information, requirements, correspondence and attachments. Supply only what is necessary for the inquiry and what you are authorized to share. Do not send passwords, payment-card information, identity documents or other sensitive personal information unless a suitable process has been agreed.",
        "The current on-page inquiry checklist validates information in your browser. Its check button does not send the entered fields or selected files to Standards, and it does not create an order. Email links open your own email application; the message is sent only when you send it from that application.",
      ],
    },
    {
      title: "Technical information and external resources",
      paragraphs: [
        "Hosting and network providers may process technical information such as IP addresses, requested URLs, browser information, access times and error events to deliver and secure the website. This infrastructure processing is separate from submitting an inquiry.",
        "The site currently requests font files or stylesheets from Google Fonts. Those requests disclose technical connection information, such as your IP address, to that provider and are subject to its privacy practices. Website images and the services video are served from this website.",
        "The site code does not intentionally configure advertising or marketing analytics cookies. Browser, hosting, email and third-party services may have their own storage or technical processes. This notice must be reviewed before introducing analytics, advertising, account features or other new data collection.",
      ],
    },
    {
      title: "Purposes and service providers",
      paragraphs: [
        "Information received through business correspondence is used to evaluate and respond to requests, communicate about potential services, administer agreed business relationships, protect against abuse, and meet applicable legal obligations. Providing an inquiry does not subscribe you to a marketing list.",
        "Hosting, email and other service providers may process information as necessary to support those purposes. Information may also need to be disclosed where required by law or to protect legitimate legal rights. Before introducing a service that materially changes processing, the business should assess its privacy and security implications and update this notice.",
        "For a specific trade engagement, any necessary exchange of documents or contact details with prospective suppliers, buyers or logistics partners should be clarified as part of that engagement. Do not assume that every inquiry document is suitable for onward distribution.",
      ],
    },
    {
      title: "Retention, location and security",
      paragraphs: [
        "Business correspondence should be kept only for as long as needed for its purpose and applicable contractual, tax, legal or dispute obligations. A specific retention period depends on the type of information and engagement; request clarification before sending material with particular retention requirements.",
        "Service providers may process information in countries different from your location. Ask for information about the relevant arrangement before sharing material that has transfer restrictions.",
        "Technical and organizational measures reduce risk, but internet transmission, email and storage cannot be guaranteed completely secure. Avoid sending unnecessary confidential or sensitive information and report suspected security problems to the published business contact.",
      ],
    },
    {
      title: "Your requests and choices",
      paragraphs: [
        `You may contact ${companyContact.generalEmail} to ask about information held about you, request correction or deletion, object to a use, or raise a privacy concern. Requests will need appropriate identity verification and consideration of applicable law and any required retention. This notice does not limit rights provided by applicable law.`,
        "You can choose not to send an inquiry, limit the information in your email, and use browser controls for external resources or local storage. The public agent tools expose business information only; they do not read your checklist fields, email, local storage or private correspondence.",
      ],
    },
    {
      title: "Changes and scope",
      paragraphs: [
        "This notice describes the current informational website and email-based inquiry process. It should be reviewed whenever inquiry delivery, storage, analytics, providers or legal requirements change. External sites linked from this website have their own privacy policies.",
      ],
    },
  ],
};
