const getCurrPage = (url) => {
    const currPathArr = url.split("/");
    const splitAt = url.includes("http") ? 4 : 2;
    //   url: 'http://localhost:3001/en/dashboard',
    //   currPathArr: [ 'http:', '', 'localhost:3001', 'en', 'dashboard' ]
    const currPath2 =
        "/" + [...currPathArr].splice(splitAt).join("/").split("?")[0];
    return currPath2;
};

export { getCurrPage };
