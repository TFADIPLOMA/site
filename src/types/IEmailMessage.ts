export interface IEmailMessage {
    id: string;
    googleUserId: string;
    messageId: string;
    internalDate: string; // ISO формат даты (UTC)
    subject: string;
    content: string;
    from: string;
    isFishing: boolean;
    fishingTypeId: string | null;
    fishingType: string | null;
}
