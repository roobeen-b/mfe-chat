import { useIntl } from "react-intl";
import { Typography } from "@mui/material";
// import { useNavigate } from "react-router";

// import { ButtonComp } from "./Button";
import { EmptyAreaIcon } from "../_icons";
import { EmptyAreaWrapper } from "./EmptyAreaWrapper";

export const EmptyArea = ({
    goBack,
    className = "",
    iconWidth = "400px",
    doNotTranslate = false,
    title = "empty_area_title",
    subtitle = "empty_area_subtitle",
}) => {
    //   const navigate = useNavigate();
    const intl = useIntl();

    const t =
        doNotTranslate || !title
            ? title
            : intl.formatMessage({ id: title, defaultMessage: title });

    const st = doNotTranslate ? subtitle : intl.formatMessage({ id: subtitle });

    //   const continueExploring = () => {
    //     if (window) {
    //       const length = window?.history?.length || 1;
    //       if (length > 1) {
    //         navigate(-1);
    //         return;
    //       }
    //     }
    //     navigate("/dashboard");
    //   };

    return (
        <EmptyAreaWrapper className={className + " eaw"} iconWidth={iconWidth}>
            <div className="eaw-container">
                <Typography
                    variant="h6"
                    gutterBottom
                    component="h2"
                    className="eaw-container-h2"
                >
                    {t}
                </Typography>
                {st && (
                    <Typography
                        gutterBottom
                        component="h3"
                        color="textSecondary"
                        className="eaw-container-h3"
                    >
                        {st}
                    </Typography>
                )}
                {/* <EmptyAreaIcon className="eaw-container-icon" /> */}
                {/* {goBack && (
          <div className="eaw-container-goBack">
            <br />
            <ButtonComp
              variant="outlined"
              onClick={continueExploring}
              className="eaw-container-goBack-btn"
            >
              {intl.formatMessage({ id: "continue_exploring" })}
            </ButtonComp>
          </div>
        )} */}
            </div>
        </EmptyAreaWrapper>
    );
};
