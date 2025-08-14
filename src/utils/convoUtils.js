const convoNameFromMembers = (arr, email) => {
    if (arr.length === 1)
        return arr[0]?.name || arr[0]?.username || arr[0]?.email;

    if (arr.length === 2 && email) {
        const withoutEmail = arr?.filter((x) => x.email !== email);
        if (withoutEmail.length === 1)
            return (
                withoutEmail[0]?.name ||
                withoutEmail[0]?.username ||
                withoutEmail[0]?.email
            );
    }
    return arr
        ?.map((x) => x?.name?.split(" ")[0] || x?.email?.split("@")[0])
        ?.join(", ");
};

const getAllParticipants = (arr, user) =>
    arr.length === 1
        ? arr
        : [
              ...arr,
              ...(user
                  ? [
                        {
                            email: user.email,
                            image: user.image || user.contact_person_image,
                            name:
                                user.contact_name ||
                                user.company_name ||
                                user.contact_name_katakana ||
                                user.company_name_katakana,
                            user_type: user.type,
                            username: user.username,
                        },
                    ]
                  : []),
          ];

const convoImageFromMembers = (arr, email, image) => {
    if (arr.length === 1) return arr[0]?.image || "";
    if (arr.length === 2 && email)
        return arr?.filter((x) => x.email !== email)?.[0]?.image || "";
    return image || "";
};
export { convoNameFromMembers, getAllParticipants, convoImageFromMembers };
