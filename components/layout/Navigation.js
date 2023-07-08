import Link from 'next/link';
import Image from 'next/image';
import { signOut } from "next-auth/react";
import homeIcon from '../../public/icons/nav/home.svg';
import targetIcon from '../../public/icons/nav/target.svg';
// import chartIcon from '../../public/icons/nav/chart.svg';
// import potionIcon from '../../public/icons/nav/potion.svg';

export default function Navigation() {
  return (
    <div className={"flex flex-row items-center justify-between bg-darkest md:flex-col md:w-48"}>
        <p className={"text-xl m-5 text-white"}>Taskchemy</p>
        <nav className={"flex flex-row items-center justify-center h-5/6 md:flex-col"}>
          <ul className={"flex flex-row items-center md:flex-col"}>
            <Link href='/' className={"flex flex-col w-full items-center justify-center m-3 md:h-28"}>
              <Image src={homeIcon} alt="dashboard" />
              <p className={"text-white"}>Dashboard</p>
            </Link>
            <Link href='/routines' className={"flex flex-col w-full items-center justify-center m-3 md:h-28"}>
              <Image src={targetIcon} alt="routines" />
              <p className={"text-white"}>Routines</p>
            </Link>
            {/* <Link href='/analytics' className={"flex flex-col w-full items-center justify-center h-28 m-3"}>
              <Image src={chartIcon} alt="analytics" />
              <p className={"text-white"}>Analytics</p>
            </Link>
            <Link href='/lab' className={"flex flex-col w-full items-center justify-center h-28 m-3"}>
              <Image src={potionIcon} alt="alchemy lab" />
              <p className={"text-white"}>Alchemy Lab</p>
            </Link> */}
          </ul>
        </nav>
        <button className={"text-white m-5"} onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
