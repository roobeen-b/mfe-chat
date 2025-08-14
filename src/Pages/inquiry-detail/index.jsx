import { useState } from "react";
import { useParams } from "react-router";

import { paramsToObject } from "../../utils";
import { useCallConvoFetch } from "@api/helpers/inquire/conversation/useCallConvoFetch";
import { useCallFetchConvoMembers } from "@api/helpers/inquire/conversation/useCallFetchConvoMembers";

import InquiryDetailLayout from "./InquiryDetailLayout";
import { SingleInquiryPage } from "./components/SingleInquiryPages";

export default function InquiryDetailPage() {
  const { id } = useParams();
  const [msgList, setMsgList] = useState([]);

  let params = new URLSearchParams(window.location.search);

  const convoFetchFilters = {
    id,
    offset: 0,
    limit: 20,
    filter: paramsToObject(params),
  };

  const convoMembersFilters = {
    id,
    offset: 0,
    limit: 20,
  };

  const handleSuccess = (data) => {
    setMsgList((v) => [...(data?.data?.rows || []), ...v]);
  };

  const { list: messages } = useCallConvoFetch(
    convoFetchFilters,
    handleSuccess
  );
  const { list: members } = useCallFetchConvoMembers(convoMembersFilters);

  const membersObj = transformData(members?.data?.[0]?.members);

  return (
    <InquiryDetailLayout>
      <SingleInquiryPage
        slug={id}
        list={msgList}
        members={membersObj}
        convoName={members?.data?.[0]?.conversation_name}
        convoImage={members?.data?.[0]?.conversation_image}
        type={messages?.data?.rows?.[0]?.conversation_type || "private"}
      />
    </InquiryDetailLayout>
  );
}

const transformData = (members = []) => {
  const result = {};
  members.forEach((member) => {
    if (member.email) {
      result[member.email] = {
        name: member.name,
        role: member.role,
        image: member.image,
        email: member.email,
        seen_at: member.seen_at,
        username: member.username,
        user_type: member.user_type,
        seen_message_id: member.seen_message_id,
      };
    }
  });

  return result;
};
