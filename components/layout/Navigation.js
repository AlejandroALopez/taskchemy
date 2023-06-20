import Link from 'next/link';

export default function Navigation() {
  return (
    <div className={"flex min-h-screen flex-col bg-slate-400 max-w-max items-center"}>
        <p>Taskchemy</p>
        <nav className={"bg-orange-300 min-h-fit min-w-full"}>
          <ul className={"flex flex-col items-center"}>
            <li className={"flex flex-col justify-center h-36"}>
              <Link href='/'>Dashboard</Link>
            </li>
            <li className={"flex flex-col justify-center h-36"}>
              <Link href='/routines'>Routines</Link>
            </li>
            <li className={"flex flex-col justify-center h-36"}>
              <Link href='/analytics'>Analytics</Link>
            </li>
            <li className={"flex flex-col justify-center h-36"}>
              <Link href='/lab'>Alchemy Lab</Link>
            </li>
          </ul>
        </nav>
        <p>Developed by:</p>
        <p>Alejandro Lopez</p>
    </div>
  );
}
