export interface PortfolioData {
    name: string,
    occupation: string,
    description: string,
    image: string,
    bio: string,
    contactMessage: string,
    email: string,
    phone: string,
    address: {
      street: string,
      city: string,
      state: string,
      zip: string,
    },
    website: string,
    resumeDownload: string,
    social: [socialData]
}

interface socialData {
    name: string,
    url: string,
    className: string
}