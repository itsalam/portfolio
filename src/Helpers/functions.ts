export const slideIcon = (name: string) => {
    switch(name.toLowerCase()) {
        case "about":
            return "person"
        case "resume":
            return "text_snippet"
        case "contact":
            return "call"
        default:
            return "home";
    }
}