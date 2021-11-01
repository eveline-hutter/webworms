import User from "@/components/user/User";

export default interface Message {
    message: string,
    user: User,
    dateTime?: string,
}