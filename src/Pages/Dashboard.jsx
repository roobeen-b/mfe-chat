import { useIntl } from "react-intl";
import Layout from "../Layout/Layout";

const Dashboard = () => {
    const { formatMessage } = useIntl();
    const breadcrumbs = [{ label: "dashboard", href: "/dashboard" }];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <p>{formatMessage({ id: "dashboard" })}</p>
            {/* Add more page-specific content here */}
        </Layout>
    );
};

export default Dashboard;
