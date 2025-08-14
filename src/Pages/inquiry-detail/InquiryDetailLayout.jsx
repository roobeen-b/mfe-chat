import Header from "../../Layout/Header";
import { MainContentWrapper } from "../../LocaleLayoutWrapper";
import { MessageListSideBar } from "./components/MessageListSideBar";
import { InquiryDetailLayoutWrapper } from "./InquiryDetailLayoutWrapper";

export default function InquiryDetailLayout({ children }) {
    return (
        <InquiryDetailLayoutWrapper className="(message_layout)">
            <Header />
            <MainContentWrapper className="idl-w-main">
                <div className="idl-w-main-flex">
                    <MessageListSideBar className="idl-w-main-flex-left" />
                    <div className="idl-w-main-flex-right">{children}</div>
                </div>
            </MainContentWrapper>
        </InquiryDetailLayoutWrapper>
    );
}
