import React from "react";

type Props = {};

const AdminSidebar: React.FC<Props> = () => {
  return (
    <footer>
      <div className="mt-4 border-t border-body-800 px-4 py-4 text-end text-xs">
        مبني على أساس نظام joury cms
      </div>
    </footer>
  );
};

export default AdminSidebar;
