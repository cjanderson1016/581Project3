/*
 * Dashboard.tsx
 * Date: November 26, 2025
 * Description: Page that displays a table of all the users -- may elevate a user into an Admin. Only avalible to Admins
 */
import { useState, useEffect, useMemo } from "react";
import "../styles/Dashboard.css";
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

// All user fields
interface User {
  id: number;
  full_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export default function Elevate() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  //Fetch all of the users
  const GetUsers = () => {
    AxiosInstance.get("/api/register/")

      .then((res) => setUsers(res.data))

      .catch((err) => console.error(err));
  };

  // Actually get all of the users
  useEffect(() => {
    GetUsers();
  }, []);

  const handleAdminToggle = (userId: number, newValue: boolean) => {

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, is_staff: newValue, is_superuser: newValue }
          : u
      )
    );

    // Send a patch request to the backend to switch the boolean values of is_staff and is_superuser
    AxiosInstance.patch(`/api/register/${userId}/`, {
      is_staff: newValue,
      is_superuser: newValue,
    }).catch((err) => console.error(err));
  };

  // Columns for the table of users
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        // Name column
        accessorKey: "full_name",
        header: "User's Full Name",
        size: 200,},
        //Email column
      {
        accessorKey: "email",
        header: "Email",
        size: 250,},
        // Admin column, checked means yes they are an admin and unchecked means they are not
      {
        id: "is_admin",
        header: "Is Admin",
        size: 100,
        accessorFn: (row) => row.is_staff || row.is_superuser,
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.original.is_staff || row.original.is_superuser}
            onChange={(e) => handleAdminToggle(row.original.id, e.target.checked)}
          />
),
      },
    ],
    []
  );


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">Elevate Users</h1>
        </div>
        <div className="header-right">
            <button className="return-icon" onClick={() => navigate("/dashboard")}>Return to Dashboard {/* Brings the user back to dashboard */}
            </button>
        </div>
      </header>

      <main>
        <MaterialReactTable columns={columns} data={users} />
      </main>
    </div>
  );
}
