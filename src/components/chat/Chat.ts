import User from "@/components/user/User";

export default interface Chat {
    message: string,
    user: User,
    dateTime?: string,
}