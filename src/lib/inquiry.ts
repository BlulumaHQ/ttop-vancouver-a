import { z } from "zod";
const text = (max = 200) => z.string().trim().max(max).refine(s => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s));
const required = (max = 200) => text(max).refine(s => s.length > 0);
const email = z.string().trim().max(254).email();
const phone = text(40).refine(s => !s || /^[+()\d\s.\-xext]+$/i.test(s));
const count = z.string().trim().regex(/^\d{1,6}$/).refine(s => Number(s) > 0);
const programFields = z.object({ contact: required(100), school: required(), email, phone,
  program: z.enum(["School Hot Lunch Program", "Montessori Daily Meals", "Other / Not sure yet"]),
  frequency: z.enum(["Daily", "Weekly", "Monthly", "Seasonal"]), count: z.union([z.literal(""), count]), message: text(5000),
}).strict();
const envelope = { locale: z.enum(["en", "zh-TW", "zh-CN"]), submissionId: z.string().uuid(), submittedAt: z.string().datetime(), website: z.string().max(200).refine(s => s === "") };
export const inquirySchema = z.discriminatedUnion("formType", [
  z.object({ ...envelope, formType: z.literal("contact"), fields: z.object({ name: required(100), email, phone, message: required(5000) }).strict() }).strict(),
  z.object({ ...envelope, formType: z.literal("catering"), fields: z.object({ name: required(100), organization: text(), email, phone: phone.refine(s => s.length > 0),
    eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => { const d = new Date(`${s}T00:00:00Z`); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10) === s; }),
    guests: count, fulfillment: z.enum(["", "Pickup", "Delivery"]), mealType: text(), dietary: text(1000), details: required(5000),
  }).strict() }).strict(),
  z.object({ ...envelope, formType: z.literal("school"), fields: programFields }).strict(),
  z.object({ ...envelope, formType: z.literal("montessori"), fields: programFields }).strict(),
]);
export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryType = Inquiry["formType"];
export const inquirySubjects: Record<InquiryType, string> = {
  contact: "TTOP Chicken — New Contact Inquiry", catering: "TTOP Chicken — New Catering Inquiry",
  school: "TTOP Chicken — New School Hot Lunch Inquiry", montessori: "TTOP Chicken — New Montessori / Daycare Inquiry",
};
export const fieldLabels: Record<string, string> = { name: "Visitor name", contact: "Contact name", email: "Email address", phone: "Phone number", organization: "Organization or company", message: "Message", eventDate: "Event date", guests: "Number of guests", fulfillment: "Pickup or delivery", mealType: "Meal or event type", dietary: "Dietary requirements", details: "Additional details", school: "School / centre name", program: "Requested program", frequency: "Service frequency", count: "Number of students / children" };
export const inquiryMessages = {
  en: { loading: "Sending…", invalid: "Please check the required fields, email address and field lengths.", error: "Your message could not be sent. Please try again or contact us by phone.", limited: "Too many attempts. Please wait a minute before trying again." },
  "zh-TW": { loading: "傳送中…", invalid: "請確認必填欄位、電子郵件地址及輸入內容長度。", error: "訊息未能送出。請再試一次，或致電與我們聯絡。", limited: "嘗試次數過多，請稍候一分鐘再試。" },
  "zh-CN": { loading: "发送中…", invalid: "请检查必填项、电子邮箱地址及输入内容长度。", error: "消息未能发送。请重试，或致电联系我们。", limited: "尝试次数过多，请等待一分钟后重试。" },
};
export const MAX_INQUIRY_BYTES = 20_000;
