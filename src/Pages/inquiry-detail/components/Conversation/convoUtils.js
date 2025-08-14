const calculateSpecificReactionCount = (arr) =>
    arr.reduce((acc, { reaction }) => {
        acc[reaction] = (acc[reaction] || 0) + 1;
        return acc;
    }, {});

export { calculateSpecificReactionCount };
