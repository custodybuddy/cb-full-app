export interface Book {
    imageUrl: string;
    alt: string;
    title: string;
    amazonLink: string;
    ariaLabel: string;
}

export const books: Book[] = [
    {
        imageUrl: "https://m.media-amazon.com/images/I/81WNrK+icJL._SX342_.jpg",
        alt: "Book cover for Co-parenting with a Toxic Ex",
        title: "Co-parenting with a Toxic Ex by Amy J.L. Baker and Paul R. Fine",
        amazonLink: "https://www.amazon.ca/dp/B0719CH1D3?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View Co-parenting with a Toxic Ex on Amazon (paid link)"
    },
    {
        imageUrl: "https://m.media-amazon.com/images/I/71C30NlvpeL._SY466_.jpg",
        alt: "Book cover for BIFF: Quick Responses to High-Conflict People",
        title: "BIFF: Quick Responses to High-Conflict People by Bill Eddy",
        amazonLink: "https://www.amazon.ca/dp/1936268728?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View BIFF: Quick Responses to High-Conflict People on Amazon (paid link)"
    },
    {
        imageUrl: "https://m.media-amazon.com/images/I/5165NcbMc4L._SY445_SX342_QL70_ML2_.jpg",
        alt: "Book cover for Divorce Poison",
        title: "Divorce Poison by Dr. Richard A. Warshak",
        amazonLink: "https://www.amazon.ca/dp/B06ZYG3KFX?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View Divorce Poison on Amazon (paid link)"
    },
    {
        imageUrl: "https://books.google.com/books/content?id=cYmQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        alt: "Book cover for The Co-Parenting Handbook",
        title: "The Co-Parenting Handbook by Karen Bonnell",
        amazonLink: "https://www.amazon.ca/dp/1632171465?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View The Co-Parenting Handbook on Amazon (paid link)"
    },
    {
        imageUrl: "https://prodimage.images-bn.com/pimages/9781499677522_p0_v1_s1200x630.jpg",
        alt: "Book cover for Mindful Co-Parenting",
        title: "Mindful Co-Parenting by Jeremy S. Gaies and James B. Morris Jr.",
        amazonLink: "https://www.amazon.ca/dp/B0711GNLJF?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View Mindful Co-Parenting on Amazon (paid link)"
    },
    {
        imageUrl: "https://m.media-amazon.com/images/I/81zEQXynx0L._SX342_.jpg",
        alt: "Book cover for The High-Conflict Custody Battle",
        title: "The High-Conflict Custody Battle by Amy J.L. Baker, J. Michael Bone, and Brian Ludmer",
        amazonLink: "https://www.amazon.ca/dp/B07RMJL37L?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View The High-Conflict Custody Battle on Amazon (paid link)"
    },
    {
        imageUrl: "https://m.media-amazon.com/images/I/81REa2yzs9L._SY466_.jpg",
        alt: "Book cover for Didn't See That Coming",
        title: "Didn't See That Coming: Putting Life Back Together When Your World Falls Apart by Rachel Hollis",
        amazonLink: "https://www.amazon.ca/s?k=Didn%27t+See+That+Coming+Rachel+Hollis&tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View Didn't See That Coming by Rachel Hollis on Amazon (paid link)"
    },
    {
        imageUrl: "http://books.google.com/books/content?id=B888lQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        alt: "Book cover for Divorcing a Narcissist: One Mom's Battle",
        title: "Divorcing a Narcissist: One Mom's Battle by Tina Swithin",
        amazonLink: "https://www.amazon.ca/s?k=Divorcing+a+Narcissist+Tina+Swithin&tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View Divorcing a Narcissist: One Mom's Battle on Amazon (paid link)"
    },
    {
        imageUrl: "https://prodimage.images-bn.com/pimages/9781801203517_p0_v1_s1200x630.jpg",
        alt: "Book cover for Dark Psychology and Manipulation",
        title: "Dark Psychology and Manipulation by William Cooper",
        amazonLink: "https://www.amazon.ca/dp/B08M8Y5G36?tag=custodybudd0c-20&language=en_CA",
        ariaLabel: "View Dark Psychology and Manipulation on Amazon (paid link)"
    }
];

export interface LegalAidService {
    province: string;
    url: string;
}

export const legalAidServices: LegalAidService[] = [
    { province: 'Ontario', url: 'https://www.legalaid.on.ca/' },
    { province: 'British Columbia', url: 'https://legalaid.bc.ca/' },
    { province: 'Alberta', url: 'https://www.legalaid.ab.ca/' },
    { province: 'Quebec', url: 'https://www.csj.qc.ca/' },
    { province: 'Manitoba', url: 'https://www.legalaid.mb.ca/' },
    { province: 'Saskatchewan', url: 'https://www.legalaid.sk.ca/' },
    { province: 'Nova Scotia', url: 'https://www.nslegalaid.ca/' },
    { province: 'New Brunswick', url: 'https://www.legalaid.nb.ca/' },
    { province: 'Newfoundland & Labrador', url: 'https://www.legalaid.nl.ca/' },
    { province: 'Prince Edward Island', url: 'https://www.legalinfopei.ca/legal-aid/' },
    { province: 'Yukon', url: 'https://www.legalaid.yk.ca/' },
    { province: 'Northwest Territories', url: 'https://www.justice.gov.nt.ca/en/boards-agencies/legal-aid-commission/' },
    { province: 'Nunavut', url: 'https://www.nulas.ca/' }
];

export interface EmailTemplate {
    category: 'Scheduling' | 'Financial' | 'Communication Boundaries';
    title: string;
    description: string;
    body: string;
}

export const emailTemplates: EmailTemplate[] = [
    {
        category: 'Scheduling',
        title: 'Responding to a Schedule Change Request',
        description: 'A firm but polite BIFF-style response to a unilateral schedule change.',
        body: `Subject: Re: [Original Subject]

Hi [Co-Parent's Name],

Thanks for the information regarding the schedule.

Per our court order, the exchange is set for [Day] at [Time]. I will be adhering to that schedule. I am not able to accommodate the change you requested.

Best,
[Your Name]`
    },
    {
        category: 'Scheduling',
        title: 'Confirming a Holiday Schedule',
        description: 'Proactively confirm an upcoming holiday exchange to prevent confusion.',
        body: `Subject: Confirming Upcoming [Holiday Name] Schedule

Hi [Co-Parent's Name],

I am writing to confirm the upcoming [Holiday Name] schedule for the children.

As per our agreement (Clause [Clause Number]), I will have the children from [Start Date and Time] to [End Date and Time]. The exchange will take place at [Location].

Please confirm you have the same understanding.

Thanks,
[Your Name]`
    },
    {
        category: 'Financial',
        title: 'Requesting Reimbursement for an Expense',
        description: 'A clear, factual request for a shared expense, including necessary documentation.',
        body: `Subject: Reimbursement for [Expense Name]

Hi [Co-Parent's Name],

I am writing to request reimbursement for my half of the [Expense Name] for [Child's Name].

The total cost was $[Total Amount]. Your half is $[Amount Owed]. I have attached a copy of the receipt for your records.

Please send the payment via [Payment Method] by [Date].

Thank you,
[Your Name]`
    },
    {
        category: 'Financial',
        title: 'Clarifying Payment Arrangement',
        description: 'Clarify an ambiguous payment request while maintaining boundaries.',
        body: `Subject: Clarification Needed on Payment Request

Hi [Co-Parent's Name],

I received your message about the payment for [Expense]. To ensure accuracy, please provide the receipt and the total amount you are requesting, along with the due date you propose.

Once I have those details, I will review and respond accordingly.

Thank you,
[Your Name]`
    },
    {
        category: 'Communication Boundaries',
        title: 'Boundary: Limit Communication to Parenting',
        description: 'A firm boundary-setting note to keep communication child-focused.',
        body: `Subject: Communication Boundaries

Hi [Co-Parent's Name],

To keep our communication focused on parenting, I will respond to messages that relate to the children's schedules, health, and schooling. I will not be responding to personal remarks.

Please keep future messages brief and focused on the children.

Thank you,
[Your Name]`
    },
    {
        category: 'Communication Boundaries',
        title: 'Boundary: Use Written Communication',
        description: 'Move heated phone exchanges to written, documented channels.',
        body: `Subject: Written Communication Request

Hi [Co-Parent's Name],

To avoid misunderstandings, I will be using written communication (email/app) for scheduling, updates, and other parenting matters. Please send future requests and updates in writing so we can both refer back to them.

Thank you for understanding,
[Your Name]`
    },
    {
        category: 'Communication Boundaries',
        title: 'Boundary: Response Time Expectation',
        description: 'Set a clear expectation for response time to reduce urgency tactics.',
        body: `Subject: Response Time

Hi [Co-Parent's Name],

For non-urgent matters, I will respond within 24 hours. If something is urgent regarding the children, please indicate that clearly in the subject line.

Thank you,
[Your Name]`
    }
];
