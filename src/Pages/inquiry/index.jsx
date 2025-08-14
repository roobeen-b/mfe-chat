import Layout from "../../Layout/Layout";
import { InquiryPages } from "./components/InquiryPages";
import { useCallInquireFetch } from "@api/helpers/inquire/useCallInquireFetch";

const fallbackData = {
  success: 1,
  statusCode: 200,
  message: "default fallback",
  data: { rows: [], count: 0 },
};

export default function InquiryPage() {
  const breadcrumbs = [
    { label: "dashboard", href: "/dashboard" },
    { label: "inquiry", href: "/inquiry" },
  ];
  const { list } = useCallInquireFetch(fallbackData, {
    offset: 0,
    limit: 10,
  });

  return <InquiryPages list={list} />;
}
