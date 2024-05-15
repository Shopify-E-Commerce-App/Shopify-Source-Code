import AdminNav from "../components/Admin/AdminNav";

export const metadata ={
    title: 'Shopify Admin',
    description: "Shopify Admin Dashboard",
};


const AdminLayout = ({children} : {children : React.ReactNode}) => {
    return ( <div>
        <div>
            <AdminNav/>
        </div>
        {children}
    </div> );
}
 
export default AdminLayout;