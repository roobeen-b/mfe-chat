const CScrollbarStyle = `
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary);
  }
  &::-webkit-scrollbar-track {
    background-color: lightgrey;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--primary-light);
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;

const CScrollbarStyle2 = `
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: grey;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;

const ScrollbarStyle = `
  .c {
    &-scrollbar {
    overflow: auto;
      ${CScrollbarStyle};
      &-0 {
        scrollbar-width: none;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      }
    }
  }
`;

const aDefaultStyle = `
a {
    text-transform: none;
    text-decoration: none;
    display: inline-block;
  }
`;

const AfterUnderlineStyle = (params) => {
    const {
        left = "0",
        width = "0",
        right = "0",
        height = "1px",
        bottom = "-0.2rem",
        borderRadius = "1rem",
        bgColor = "var(--primary)",
    } = params;
    return `
   &::after {
      content: "";
      left: ${left};
      width: ${width};
      right: ${right};
      height: ${height};
      bottom: ${bottom};
      position: absolute;
      transition: all 0.3s ease-in;
      background-color: ${bgColor};
      border-radius: ${borderRadius};
    }
    &:hover {
      &::after {
        left: 0;
        width: 100%;
        right: unset;
      }
    }
`;
};

const ClampedTextStyle = (lines = 2, lineHeight = 1.5) => `
    display: -webkit-box;           
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: ${lines};  
    overflow: hidden;              
    text-overflow: ellipsis;       
    line-height: ${lineHeight};
    max-height: ${lineHeight * lines}em; 
`;

export {
    ScrollbarStyle,
    CScrollbarStyle,
    CScrollbarStyle2,
    aDefaultStyle,
    AfterUnderlineStyle,
    ClampedTextStyle,
};
