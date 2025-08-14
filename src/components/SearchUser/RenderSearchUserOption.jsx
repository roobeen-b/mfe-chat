import { Link } from "react-router";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { RenderSearchUserOptionWrapper } from "./SearchUserWrapper";

const getProperLink = (option) => {
  const { id, has_landing, username } = option;

  return has_landing
    ? `/profile/landing-page-view?user_id=${id}`
    : `/profile/${username}`;
};

const RenderSearchUserOption = (props) => {
  const { option, checkbox, optionProps, actionItem, redirect = true } = props;
  const { key, ...rest } = optionProps;

  const name = option?.name ?? option?.username;
  const keyId = `${key}-${optionProps["data-option-index"]}`;
  const companyName = option?.company_name ?? option?.company_name_katakana;

  return (
    <RenderSearchUserOptionWrapper key={keyId} {...rest} className="rsu-ow">
      <Link
        id={keyId}
        className="rsu-ow-a"
        href={redirect ? getProperLink(option) : "#"}
      >
        <div className="rsu-ow-item">
          <AvatarComp
            className="rsu-ow-item-avatar"
            sx={{ width: 30, height: 30 }}
            alt={name?.slice(0, 20)}
            src={option?.cover_image ?? option?.image}
            variant={option?.cover_image ? "rounded" : "circular"}
          />
          <div className="rsu-ow-item-content">
            <Typography className="rsu-ow-item-title">
              <b>{name}</b>
            </Typography>
            <div className="rsu-ow-item-tag">
              <span>{companyName}</span>
            </div>
          </div>
          {checkbox && (
            <Checkbox size="small" checked={Boolean(rest?.["aria-selected"])} />
          )}
        </div>
        {actionItem ? actionItem : null}
      </Link>
    </RenderSearchUserOptionWrapper>
  );
};

export { RenderSearchUserOption };
