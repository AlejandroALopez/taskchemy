import Navigation from "./Navigation";

function Layout(props) {
  return (
    <div className={"flex flex-row w-screen"}>
      <Navigation />
      <main className={"w-full bg-white"}>{props.children}</main>
    </div>
  );
}

export default Layout;
