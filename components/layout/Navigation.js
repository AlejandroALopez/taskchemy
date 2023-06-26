import Link from 'next/link';
import Image from 'next/image';
import homeIcon from '../../public/icons/nav/home.svg';
import targetIcon from '../../public/icons/nav/target.svg';
import chartIcon from '../../public/icons/nav/chart.svg';
import potionIcon from '../../public/icons/nav/potion.svg';

export default function Navigation() {
  return (
    <div className={"flex min-h-screen flex-col bg-slate-400 items-center w-36"}>
        <p className={"text-xl mt-5 mb-5"}>Taskchemy</p>
        <nav className={"min-h-fit min-w-full"}>
          <ul className={"flex flex-col items-center"}>
            <Link href='/' className={"flex flex-col bg-gray-800 w-full items-center justify-center h-28 m-3"}>
              <Image src={homeIcon} alt="dashboard" />
              <p className={"text-white"}>Dashboard</p>
            </Link>
            <Link href='/routines' className={"flex flex-col bg-gray-800 w-full items-center justify-center h-28 m-3"}>
              <Image src={targetIcon} alt="routines" />
              <p className={"text-white"}>Routines</p>
            </Link>
            <Link href='/analytics' className={"flex flex-col bg-gray-800 w-full items-center justify-center h-28 m-3"}>
              <Image src={chartIcon} alt="analytics" />
              <p className={"text-white"}>Analytics</p>
            </Link>
            <Link href='/lab' className={"flex flex-col bg-gray-800 w-full items-center justify-center h-28 m-3"}>
              <Image src={potionIcon} alt="alchemy lab" />
              <p className={"text-white"}>Alchemy Lab</p>
            </Link>
          </ul>
        </nav>
        <p>Developed by:</p>
        <p>Alejandro Lopez</p>
    </div>
  );
}
