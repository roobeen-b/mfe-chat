import styled from "@emotion/styled";

export const SwitchStyle = styled.div`
    .toggle-switch {
        isolation: isolate;
        position: relative;
        height: 1.1rem;
        width: 2.2rem;
        border-radius: 1.5rem;
        overflow: hidden;
        background: ${({ theme }) => theme.palette.action.disabled};
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
        &.active {
            background: ${({ theme }) => theme.palette.primary.main};
            .indicator {
                left: 1.2rem;
            }
        }
    }
    .indicator {
        top: 0.15rem;
        left: 0.2rem;
        width: 0.8rem;
        height: 0.8rem;
        background: ${({ theme }) => theme.palette.common.white};
        position: absolute;
        border-radius: 50%;
        transition: all 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    }
`;

export default function Switch({ handleChange, isChecked }) {
    return (
        <SwitchStyle>
            <div
                onClick={() => {
                    handleChange();
                }}
                className={`toggle-switch ${isChecked ? "active" : ""}`}
            >
                <div className="indicator"></div>
            </div>
        </SwitchStyle>
    );
}
