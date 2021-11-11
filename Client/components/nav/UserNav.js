import Link from "next/link";

const UserNav = () => {
  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href='/user'>
        <a className='nav-link active'> user Dashboard </a>
      </Link>
    </div>
  );
};

export default UserNav;
